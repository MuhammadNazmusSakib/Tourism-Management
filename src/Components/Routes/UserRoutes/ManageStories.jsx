import React, { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Contex } from "../../ContexApi/Contex";
import Swal from "sweetalert2";

const ManageStories = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {user} = useContext(Contex)

  // Fetch all stories
  const { data: stories, isLoading, refetch, error } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${user?.email}`);
      return res.data;
    },
  });
  


  const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/stories/${id}`);
            // console.log(res.data);
            if (res.data.deletedCount > 0) {
                // refetch to update the ui
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `The Story has been Deleted.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        }
    });
}

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading stories</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Manage Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white flex flex-col justify-between shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={story.images[0]} // Display the first image
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-gray-700">
                {story.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">{story.text}</p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => navigate(`/dashboard/edit-story/${story._id}`)}
                  className="bg-blue-600 text-white w-full py-1 px-3 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="bg-red-600 text-white w-full py-1 px-3 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
