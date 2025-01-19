import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Contex } from "../ContexApi/Contex";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useContext(Contex)
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is admin', user)
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;