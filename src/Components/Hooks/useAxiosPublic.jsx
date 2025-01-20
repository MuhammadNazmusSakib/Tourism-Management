import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://tourism-management-server-tan.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

