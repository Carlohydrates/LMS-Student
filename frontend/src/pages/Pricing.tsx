/* eslint-disable @typescript-eslint/no-unused-vars */
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { Button, Card, Table, TableCell } from "flowbite-react";
import { CircleCheck } from "lucide-react";

const Pricing = () => {
  return (
    <main className="flex flex-row">
      <NavContext.Provider value={"pricing"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive-600 pb-20">
          <HeaderLoggedIn />
          <div className="lg:w-11/12 h-full mx-auto my-12">
            <div className="flex flex-row justify-evenly gap-4 p-4">
              <Card className="flex w-[32rem] h-[38rem] text-center">
                <h1 className="poppins-semibold text-4xl">FREE</h1>
                <p className="poppins-regular text-2xl">&#8369; 0</p>
                <p className="poppins-regular text-sm">
                  Get started right away with access to free courses
                </p>
              </Card>
              <Card className="flex w-[32rem] h-[38rem] text-center">
                <h1 className="poppins-semibold text-4xl">PREMIUM</h1>
                <p className="poppins-regular text-2xl">&#8369; 500</p>
                <p className="poppins-regular text-sm">
                  Step up your learning with access to premium courses and more
                </p>
                <Button
                  outline
                  className="size-fit self-center my-8 poppins-semibold"
                >
                  Upgrade to Premium
                </Button>
              </Card>
            </div>
            <div className="lg:w-11/12 h-full mx-auto my-12">
              <h1 className="poppins-semibold text-snow text-2xl">Features</h1>
              <Table className="bg-snow rounded-lg poppins-regular">
                <Table.Head>
                  <Table.HeadCell></Table.HeadCell>
                  <Table.HeadCell>FREE TIER</Table.HeadCell>
                  <Table.HeadCell>PREMIUM TIER</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <TableCell>Access to free courses</TableCell>
                    <TableCell><CircleCheck className="text-green-400" /></TableCell>
                    <TableCell><CircleCheck className="text-green-400" /></TableCell>
                  </Table.Row>
                  <Table.Row>
                    <TableCell>Access to premium courses</TableCell>
                    <TableCell></TableCell>
                    <TableCell><CircleCheck className="text-green-400" /></TableCell>
                  </Table.Row>
                  <Table.Row>
                    <TableCell>Unlimited practice questions</TableCell>
                    <TableCell></TableCell>
                    <TableCell><CircleCheck className="text-green-400" /></TableCell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </NavContext.Provider>
    </main>
  );
};

export default Pricing;
