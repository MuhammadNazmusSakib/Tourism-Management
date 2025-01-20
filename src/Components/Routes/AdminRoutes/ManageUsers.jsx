import React, { useEffect, useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const axiosSecure = useAxiosSecure()

    const rolesOptions = [
        { value: "Tourist Guide", label: "Tourist Guide" },
        { value: "Tourist", label: "Tourist" },
        { value: "Admin", label: "Admin" },
    ];

    useEffect(() => {
        // Fetch all users
        axiosSecure.get("/users")
            .then((res) => {
                setUsers(res.data);
                setFilteredUsers(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = users.filter((user) => {
            return (
                user.displayName.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            );
        });

        if (selectedRole) {
            setFilteredUsers(
                filtered.filter((user) => user.role === selectedRole.value)
            );
        } else {
            setFilteredUsers(filtered);
        }
    };

    const handleRoleFilter = (selectedOption) => {
        setSelectedRole(selectedOption);

        if (selectedOption) {
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user.role === selectedOption.value &&
                        (user.displayName.toLowerCase().includes(searchQuery) ||
                            user.email.toLowerCase().includes(searchQuery))
                )
            );
        } else {
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user.displayName.toLowerCase().includes(searchQuery) ||
                        user.email.toLowerCase().includes(searchQuery)
                )
            );
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border rounded p-2 flex-1 w-full"
                />
                <Select
                    options={rolesOptions}
                    value={selectedRole}
                    onChange={handleRoleFilter}
                    isClearable
                    placeholder="Filter by Role"
                    className="flex-1 w-full"
                />
            </div>

            {/* Users Table */}
            {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Serial</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, idx) => (
                                <tr key={user._id}>
                                    <td className="border border-gray-300 text-center px-4 py-2">{idx + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.displayName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default ManageUsers;
