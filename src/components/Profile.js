import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./context/Auth";
import { Button, Input, FormControl, FormLabel, Box } from "@chakra-ui/react";

export default function Profile() {
  const { user } = useAuth();
  const [username, setUsername] = useState(null);
  useEffect(() => {
    getProfile();
  }, [user]);

  console.log(user);

  async function getProfile() {
    try {
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  // update profile
  async function updateProfile() {
    try {
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <Box>
      <FormControl py={1}>
        <FormLabel
          htmlFor="input-username"
          fontSize="sm"
          display={"inline"}
          float={"left"}
        >
          Username
        </FormLabel>
        <Input
          placeholder="johnDoe2"
          variant={"filled"}
          display={"inline"}
          id="input-username"
          type="username"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme={"green"}
        onClick={(e) => {
          e.preventDefault();
          updateProfile();
        }}
        my={3}
        float={"right"}
      >
        Save
      </Button>
    </Box>
  );
}
