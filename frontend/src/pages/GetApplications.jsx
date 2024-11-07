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
        const response = await apiConnector(
          "GET",
          "http://localhost:8000/api/v1/app/applications"
        );
        if (response.data && response.data.success) {
          setApplications(response.data.applications);
        } else {
          console.error("Failed to fetch applications:", response.data.message);
        }
      } catch (error) {
        console.error(
          "Error fetching applications:",
          error.message || "Unknown error"
        );
      }
    };
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await apiConnector(
        "PUT",
        `http://localhost:8000/api/v1/app/applications/${applicationId}`,
        { status: newStatus }
      );
      if (response.data && response.data.success) {
        // Update the application status in the state
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application._id === applicationId
              ? { ...application, status: newStatus }
              : application
          )
        );
        console.log("Status updated successfully:", response.data.message);
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error.message || "Unknown error");
    }
  };

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
                      className={`px-4 py-2 rounded-md ${
                        application.status === "accepted"
                          ? "bg-green-500 hover:bg-green-600"
                          : application.status === "rejected"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1) || "Pending"}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() =>
                          handleStatusUpdate(application._id, "accepted")
                        }
                        className="hover:text-green-500"
                      >
                        Accepted
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleStatusUpdate(application._id, "rejected")
                        }
                        className="hover:text-red-500"
                      >
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
