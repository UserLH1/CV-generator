import { useState } from 'react'
import { User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserPanelProps {
  username?: string;
  avatarUrl?: string;
  onLogout: () => void;
}

export default function UserPanel({ username = '', avatarUrl, onLogout }: UserPanelProps = { username: '', onLogout: () => console.log('Logout clicked') }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    setIsOpen(false)
  }

  return (
    <div className="absolute top-4 right-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-10 w-10 rounded-full">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback>{username ? username.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{username || 'User'}</span>
            </div>
            <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}