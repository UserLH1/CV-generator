import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "@/services/api";
import { Loader2, PlusSquare } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
const AddResume = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [resumeTitle, setResumeTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigate();
  const onCreate = () => {

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL ?? ""}/api/cv/createCV`, {
        title: resumeTitle,
        email: localStorage.getItem("user"),
      })
      .then((response) => {

        navigation(`/dashboard/resume/${response.data.id}/edit`);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

      });
    setOpenDialog(false);
  };

  return (
    <div>
      {" "}
      <button type="button" aria-label="Add resume"
        className="p-14 py-20 border items-center flex justify-center bg-secondary rouned-lg h-[280px]\
       hover:scale-105 hover:transition-all hover:shadow cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Resume</DialogTitle>
            <DialogDescription>
              <p>Adauga un titlu pentru CV-ul tau</p>
              <Input
                className="mt-2"
                placeholder="Ex: CV Full Stack"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className=" flex justify-en  d gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
