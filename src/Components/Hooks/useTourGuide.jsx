import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Contex } from "../ContexApi/Contex";
import useAxiosSecure from "./useAxiosSecure";


const useTourGuide = () => {
    const { user, loading } = useContext(Contex)
    const axiosSecure = useAxiosSecure()
    const { data: isTourGuide, isPending: isTourGuideLoading } = useQuery({
        queryKey: [user?.email, 'isTourGuide'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is tourGuide', user)
            const res = await axiosSecure.get(`/users/tourGuide/${user.email}`);
            // console.log(res.data);
            return res.data?.tourGuide;
        }
    })
    return [isTourGuide, isTourGuideLoading]
};

export default useTourGuide;