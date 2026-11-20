#!/usr/bin/env bash
set -euo pipefail
umask 077

project_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
backup_dir=${CV_BACKUP_DIR:?Set CV_BACKUP_DIR to a directory outside the app checkout}
compose=(docker compose --project-directory "$project_dir")
mkdir -p -- "$backup_dir"
exec 9>"$backup_dir/.backup.lock"
flock -n 9

timestamp=$(date -u +%Y%m%dT%H%M%SZ)
archive="$backup_dir/cv-$timestamp.dump"
temporary=$(mktemp "$backup_dir/.cv-XXXXXXXX")
scratch_db=
cleanup() {
  rm -f -- "$temporary"
  if [[ -n $scratch_db ]]; then
    "${compose[@]}" exec -T db dropdb -U cv --if-exists "$scratch_db"
  fi
}
trap cleanup EXIT

"${compose[@]}" exec -T db pg_dump -U cv --format=custom --no-owner --no-privileges cv >"$temporary"
test -s "$temporary"
if [[ ${1:-} == --verify-restore ]]; then
  scratch_db="cv_restore_$(date +%s)_$$"
  "${compose[@]}" exec -T db createdb -U cv "$scratch_db"
  "${compose[@]}" exec -T db pg_restore -U cv --exit-on-error --no-owner --no-privileges --dbname="$scratch_db" <"$temporary"
  "${compose[@]}" exec -T db psql -U cv -d "$scratch_db" -v ON_ERROR_STOP=1 \
    -c 'SELECT count(*) AS restored_resumes FROM cv;' \
    -c 'SELECT count(*) AS restored_accounts FROM "user";'
fi
mv -- "$temporary" "$archive"
printf '%s\n' "$archive"
