import { useCallback } from "react";
import useCreateStore from "@/store/useCreateStore";
import axios from "axios";

const usePostHandler = () => {
  const photo = useCreateStore((state) => state.photo);
  const title = useCreateStore((state) => state.title);
  const bin = useCreateStore((state) => state.bin);
  const latitude = useCreateStore((state) => state.latitude);
  const longitude = useCreateStore((state) => state.longitude);

  const handlePost = useCallback(async () => {
    if (photo && title && bin && latitude && longitude) {
      try {
        await axios.post("/api/post", {
          bin,
          photo,
          title,
          lat: latitude,
          long: longitude,
        });
        alert("Post created successfully!");
      } catch (error) {
        console.error("Failed to create post:", error);
        alert("Failed to create post.");
      }
    } else {
      alert("Please fill out all fields before submitting.");
    }
  }, [photo, title, bin, latitude, longitude]);

  return { handlePost };
};

export default usePostHandler;
