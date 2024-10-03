import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@chakra-ui/react";

const GetApplications = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Hostel</Th>
            <Th>Room No.</Th>
            <Th>Issue</Th>
            <Th>Date</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Ram</Td>
            <Td>Virat</Td>
            <Td>B102</Td>
            <Td>12</Td>
            <Td>2024-10-03</Td>
            <Td isNumeric>
              <Popover>
                <PopoverTrigger>
                  <Button>submit</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex w-fit items-center my-2 cursor-pointer">
                    <span>View Details</span>
                  </div>
                  <div className="flex w-fit items-center my-2 cursor-pointer">
                    <span>Delete</span>
                  </div>
                </PopoverContent>
              </Popover>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
};

export default GetApplications;
