import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { apiConnector } from "../services/apiConnector"; // Adjust the import as necessary

const GetApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await apiConnector("GET", "http://localhost:8000/api/v1/app/applications"); // Adjust the endpoint to match your backend route

        console.log("Response from API:", response); // Log the full response for debugging

        if (response.data && response.data.success) {
          setApplications(response.data.applications); // Set the applications
        } else {
          console.error("Failed to fetch applications:", response.data.message);
        }
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data
          : error.message || "An unknown error occurred";
        console.error("Error fetching applications:", errorMessage);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-4">
      <Table className="table-auto w-full bg-gray-100 rounded-lg shadow-md">
        <TableCaption className="text-lg text-gray-600 mb-4">
          A list of your recent applied users
        </TableCaption>
        <Thead className="bg-gray-300">
          <Tr>
            <Th className="p-3 text-left">Full Name</Th>
            <Th className="p-3 text-left">Hostel</Th>
            <Th className="p-3 text-left">Room No.</Th>
            <Th className="p-3 text-left">Issue</Th>
            <Th className="p-3 text-left">Date</Th>
            <Th className="p-3 text-right">Action</Th>
          </Tr>
        </Thead>
        <Tbody className="bg-white">
          {Array.isArray(applications) && applications.length > 0 ? (
            applications.map((application) => (
              <Tr key={application._id} className="hover:bg-gray-100">
                <Td className="p-3">
                  {application.complaint.Applicant.fullname}
                </Td>
                <Td className="p-3">
                  {application.complaint.Applicant.hostel}
                </Td>
                <Td className="p-3">
                  {application.complaint.Applicant.roomNo}
                </Td>
                <Td className="p-3">{application.complaint.issue}</Td>
                <Td className="p-3">
                  {new Date(application.createdAt).toLocaleDateString()}
                </Td>
                <Td className="p-3 text-right">
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1) || "Pending"}
                    </MenuButton>
                    <MenuList>
                      <MenuItem className="hover:text-green-500">
                        Accepted
                      </MenuItem>
                      <MenuItem className="hover:text-red-500">
                        Rejected
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="6" className="text-center p-4">
                No applications found.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default GetApplications;
