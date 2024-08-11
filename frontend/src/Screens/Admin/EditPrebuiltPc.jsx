import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import Container from "../../components/Container";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLogoutMutation,
  useUpdateUserProfileMutation,
} from "../../Features/usersApiSlice";
import { useEffect, useState } from "react";
import { useToast } from "../../components/ui/use-toast";
import {
  useGetSpecificPrebuiltPcQuery,
  useUpdatePrebuiltPcMutation,
} from "../../Features/pcConfigureApiSlice";

const EditPrebuiltPc = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: prebuiltPcId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [logoutUser] = useLogoutMutation();
  const [
    updateUserProfile,
    { isLoading: updateUserLoading, error: updateUserError },
  ] = useUpdateUserProfileMutation();

  const {
    data: prebuiltPcDetails,
    isLoading: prebuiltPcDetailsLoading,
    error: prebuiltPcDetailsError,
    refetch,
  } = useGetSpecificPrebuiltPcQuery(prebuiltPcId);

  const [
    updatePrebuiltPc,
    { isLoading: updatePrebuiltPcLoading, error: updatePrebuiltPcError },
  ] = useUpdatePrebuiltPcMutation();
  const [pcName, setPcName] = useState("");
  const [pcCategory, setPcCategory] = useState("");
  const [pcUses, setPcUses] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const handleUpdatePrebuiltPc = async (e, pcDetails) => {
    e.preventDefault();
    if (!pcCategory || !pcName || !pcUses || !countInStock) {
      toast({
        title: "Missing all details!",
        variant: "destructive",
      });
      return;
    } else {
      const payload = {
        ...pcDetails,
        pcName,
        pcCategory,
        pcUses,
        countInStock,
        prebuiltPcId: pcDetails?._id,
      };
      try {
        const res = await updatePrebuiltPc(payload);
        toast({
          title: `Updated prebuilt pc: ${res?.pcName}`,
        });
        refetch();
      } catch (error) {
        console.log(error);
        toast({
          title: "Unable to update prebuilt pc!",
          description: error?.message || error?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    if (prebuiltPcDetails?.pcName) {
      setPcName(prebuiltPcDetails?.pcName);
      setPcUses(prebuiltPcDetails?.pcUses);
      setPcCategory(prebuiltPcDetails?.pcCategory);
      setCountInStock(prebuiltPcDetails?.countInStock);
    }
  }, [prebuiltPcDetails]);

  return (
    <div className="flex w-full flex-col gap-8 h-[63vh]">
      <Container className="flex flex-col gap-8">
        <div className="grid gap-4 overflow-auto py-4 md:grid-cols-4 lg:grid-cols-4">
          <div className="side-bar grid md:col-span-1"></div>
          <div className="content grid md:col-span-3 gap-8">
            <div className="content flex flex-col gap-6 account-details">
              <div className="flex justify-start items-center">
                <h1 className="text-[28px] font-bold tracking-wide pb-1 border-b-4 border-primary">
                  Edit Prebuilt PC
                </h1>
              </div>
              <div>
                <Card className="mx-auto ">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Edit {prebuiltPcDetails?.pcName}
                    </CardTitle>
                    <CardDescription>Update prebilt pc details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Card className="overflow-hidden w-full">
                      <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
                        <div className="grid gap-0.5">
                          <CardTitle className="group flex items-center gap-2 text-lg">
                            Details
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                          <div className="flex items-center gap-3">
                            <Label
                              htmlFor="pcName"
                              className="w-1/5 text-left text-xs"
                            >
                              Name
                            </Label>
                            <Input
                              id="pcName"
                              placeholder="Recommended Name"
                              className="w-4/5"
                              value={pcName}
                              onChange={(e) => setPcName(e.target.value)}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Label htmlFor="pcUses" className="w-1/5 text-left">
                              Uses
                            </Label>
                            <Input
                              id="pcUses"
                              placeholder="Recommended Uses"
                              className="w-4/5"
                              value={pcUses}
                              onChange={(e) => setPcUses(e.target.value)}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Label
                              htmlFor="pcCategory"
                              className="w-1/5 text-left"
                            >
                              Category
                            </Label>
                            <Input
                              id="pcCategory"
                              placeholder="Recommended Category"
                              className="w-4/5"
                              value={pcCategory}
                              onChange={(e) => setPcCategory(e.target.value)}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Label htmlFor="stock" className="w-1/5 text-left">
                              Stock
                            </Label>
                            <Input
                              id="stock"
                              type="number"
                              className="w-4/5"
                              value={countInStock}
                              onChange={(e) => setCountInStock(e.target.value)}
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t bg-muted/50 px-6 py-3">
                        <Button
                          onClick={(e) =>
                            handleUpdatePrebuiltPc(e, prebuiltPcDetails)
                          }
                        >
                          Update Prebuilt Pc
                        </Button>
                      </CardFooter>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditPrebuiltPc;
