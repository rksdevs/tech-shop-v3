import Container from "../../components/Container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Label } from "../../components/ui/label";
import {
  useApplyOfferMutation,
  useCreateOfferMutation,
  useDeleteOfferMutation,
  useGetAllOffersQuery,
  useUpdateOfferMutation,
  useUploadOfferImageMutation,
} from "../../Features/offersApiSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useToast } from "../../components/ui/use-toast";
import { useGetAllCategoriesQuery } from "../../Features/productApiSlice";
import { Plus, Trash2, Upload } from "lucide-react";
import { Textarea } from "../../components/ui/textarea";
import saleOne from "../../components/assets/images/sale-3.jpg";
import placeHolderImg from "../../components/assets/images/placeholder.svg";
import { Helmet } from "react-helmet-async";

const AdminCreateOffer = () => {
  const [offerName, setOfferName] = useState("");
  const [offerDiscount, setOfferDiscount] = useState(0);
  const [status, setStatus] = useState("");
  const [offerId, setOfferId] = useState("");
  const [offerImage, setOfferImage] = useState(
    "https://computer-makers-products-cpu.s3.ap-south-1.amazonaws.com/1721302204967-sale-4.jpg"
  );
  const [offerHeading, setOfferHeading] = useState("");
  const [offerTagline, setOfferTagline] = useState("");
  const { toast } = useToast();
  const [productCategory, setProductCategory] = useState("");

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [uploadImageFunc, { isLoading: uploadLoading, error: uploadError }] =
    useUploadOfferImageMutation();

  const handleFileChange = (event) => {
    setSelectedImageFile(event.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!selectedImageFile) return;

    const formData = new FormData();
    formData.append("image", selectedImageFile);

    try {
      const res = await uploadImageFunc(formData).unwrap();
      setOfferImage(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedOffer, setSelectedOffer] = useState({
    offerName: null,
    offerDiscount: 0,
    status: "Inactive",
    offerId: "",
    offerHeading: "",
    offerTagline: "",
    offerImage: "",
  });
  const [selectedOfferToApply, setSelectedOfferToApply] = useState({
    offerName: null,
    offerDiscount: 0,
    status: "Inactive",
    offerHeading: "",
    offerImage: "",
    offerTagline: "",
  });

  const {
    data: allOffers,
    isLoading: offersLoading,
    error: offersError,
    refetch,
  } = useGetAllOffersQuery();

  const [
    updateOffer,
    { isLoading: updateOfferLoading, error: updateOfferError },
  ] = useUpdateOfferMutation();

  const [
    createOffer,
    { isLoading: createOfferLoading, error: createOfferError },
  ] = useCreateOfferMutation();

  const {
    data: allCategories,
    isLoading: allCategoriesLoading,
    error: allCategoriesError,
  } = useGetAllCategoriesQuery();

  const [applyOffer, { isLoading: applyOfferLoading, error: applyOfferError }] =
    useApplyOfferMutation();

  const [
    deleteOffer,
    { isLoading: deleteOfferLoading, error: deleteOfferError },
  ] = useDeleteOfferMutation();

  useEffect(() => {
    // console.log(allOffers);
  }, [allOffers]);

  const handleCreateOffer = async () => {
    try {
      const res = await createOffer({
        offerName: "New Offer",
        offerDiscount: 0,
        status: "Inactive",
        offerImage:
          "https://computer-makers-products-cpu.s3.ap-south-1.amazonaws.com/1721302204967-sale-4.jpg",
        offerHeading: "Add the offer heading here",
        offerTagline: "Add the offer tagline here",
      }).unwrap();
      toast({
        title: "New Offer Created, edit now!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create offer!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateOffer = async (e) => {
    e.preventDefault();
    try {
      console.log({
        offerName,
        offerDiscount,
        status,
        offerId,
        offerHeading,
        offerTagline,
        offerImage,
      });
      const res = await updateOffer({
        offerName,
        offerDiscount,
        status,
        offerId,
        offerHeading,
        offerTagline,
        offerImage,
      }).unwrap();
      toast({
        title: `${res?.offerName} Offer Updated!`,
      });
      refetch();
      setSelectedOffer(() => ({
        offerName: "",
        offerDiscount: 0,
        status: "Inactive",
        offerId: "",
        offerHeading: "",
        offerTagline: "",
        offerImage: "",
      }));
      setOfferName("");
      setOfferDiscount(0);
      setStatus("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create offer!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleOfferSelection = (e) => {
    console.log(e);
    setSelectedOffer((prevstate) => ({
      ...prevstate,
      offerName: e.offerName,
      offerDiscount: e.offerDiscount,
      status: e.status,
      offerId: e._id,
      offerHeading: e.offerHeading,
      offerImage: e.offerImage,
      offerTagline: e.offerTagline,
    }));
    setOfferId(e._id);
  };

  const handleApplyOfferSelection = (e) => {
    setSelectedOfferToApply((prevstate) => ({
      ...prevstate,
      offerName: e.offerName,
      offerDiscount: e.offerDiscount,
      status: e.status,
      offerHeading: e.offerHeading,
      offerImage: e.offerImage,
      offerTagline: e.offerTagline,
    }));
    // setOfferId(e._id);
  };

  const handleApplyOffer = async (e) => {
    e.preventDefault();
    console.log({ offer: { ...selectedOfferToApply }, productCategory });
    try {
      await applyOffer({
        offer: { ...selectedOfferToApply },
        productCategory,
      }).unwrap();
      toast({
        title: "Offer applied",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create offer!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteOffer = async (e) => {
    // console.log(e);
    e.preventDefault();
    try {
      if (!selectedOffer?.offerId) {
        toast({
          title: "No offers selected, select offer to delete!",
          variant: "destructive",
        });
        return;
      } else if (selectedOffer?.status === "Active") {
        toast({
          title: "Cannot delete active offer. Deactivate it to delete!",
          variant: "destructive",
        });
        return;
      } else {
        await deleteOffer(selectedOffer?.offerId).unwrap();
        toast({
          title: "Offer deleted successfully!",
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Can not delete offer!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (selectedOffer?.offerName) {
      setOfferName(selectedOffer?.offerName);
    }
    if (selectedOffer?.offerDiscount) {
      setOfferDiscount(selectedOffer?.offerDiscount);
    }
    if (selectedOffer?.status) {
      setStatus(selectedOffer?.status);
    }

    if (selectedOffer?.offerHeading) {
      setOfferHeading(selectedOffer?.offerHeading);
    }
    if (selectedOffer?.offerTagline) {
      setOfferTagline(selectedOffer?.offerTagline);
    }
    if (selectedOffer?.offerImage) {
      setOfferImage(selectedOffer?.offerImage);
    }
  }, [selectedOffer]);

  return (
    <div className="flex w-full flex-col gap-8">
      <Helmet>
        <title>Offers - Admin</title>
        <meta
          name="description"
          content="Admin page to create, update & deactivate offers"
        />
        <link rel="canonical" href="/admin/all-offers" />
      </Helmet>
      <Container className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">Offers</h1>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Tabs
              defaultValue="edit"
              className="w-full col-span-3 md:col-span-2"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit Offer</TabsTrigger>
                <TabsTrigger value="apply">Apply Offer</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="flex flex-col mt-0 gap-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between mt-4 items-center">
                  <h1 className="text-lg font-bold">Create and Edit Offer</h1>
                  <div className="flex gap-2">
                    <Button
                      className="flex gap-1 items-center justify-center"
                      size="sm"
                      onClick={handleDeleteOffer}
                      disabled={!offerId}
                    >
                      {" "}
                      <Trash2 className="h-4 w-4 pb-0.5" /> Delete Offer
                    </Button>
                    <Button
                      className="flex gap-1"
                      size="sm"
                      onClick={handleCreateOffer}
                    >
                      {" "}
                      <Plus className="h-4 w-4 pb-0.5" /> Create Offer
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-left mt-2">
                  <Label htmlFor="offer">Select Offer To Edit</Label>
                  <Select onValueChange={(e) => handleOfferSelection(e)}>
                    <SelectTrigger id="offer" aria-label="offer">
                      <SelectValue placeholder="Select offer to edit" />
                    </SelectTrigger>
                    <SelectContent>
                      {allOffers?.map((offer, index) => (
                        <SelectItem key={index} value={offer}>
                          {offer?.offerName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Card className="p-4">
                  <form className="flex flex-col gap-8 text-left flex-grow mt-4">
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="offername">Offer Name</Label>
                      <Input
                        id="offername"
                        placeholder="Update offer name"
                        type="text"
                        required
                        value={offerName}
                        onChange={(e) => setOfferName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        placeholder="Enter discount %"
                        type="number"
                        value={offerDiscount}
                        max={100}
                        min={0}
                        onChange={(e) => setOfferDiscount(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        onValueChange={(e) => setStatus(e)}
                        defaultValue={status}
                      >
                        <SelectTrigger id="status" aria-label="Status">
                          <SelectValue placeholder={status || "Status"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="offerHeading">Offer Heading</Label>
                      <Input
                        id="offerHeading"
                        type="text"
                        placeholder="Offer Heading"
                        required
                        value={offerHeading}
                        onChange={(e) => setOfferHeading(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="offerTagline">Offer Tagline</Label>
                      <Textarea
                        id="offerTagline"
                        type="text"
                        required
                        placeholder="Type offer's tagline here."
                        value={offerTagline}
                        onChange={(e) => setOfferTagline(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="offerId">Offer Id</Label>
                      <Input
                        id="offerId"
                        type="text"
                        required
                        defaultValue={selectedOffer?.offerId || ""}
                        readOnly
                      />
                    </div>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle className="mb-2">Offer Image</CardTitle>
                        <CardDescription className="flex gap-6 items-end">
                          {selectedOffer?.offerImage && (
                            <Input
                              defaultValue={selectedOffer?.offerImage}
                              readOnly
                            />
                          )}
                          <Input type="file" onChange={handleFileChange} />
                          <Button onClick={(e) => handleImageUpload(e)}>
                            <Upload className="h-4 w-4" />
                          </Button>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <img
                            // src={
                            //   offerImage === "/images/sample.jpg"
                            //     ? placeHolderImg
                            //     : offerImage
                            // }
                            src={offerImage}
                            alt="upload sample img"
                            height="80"
                            width="80"
                            className="aspect-square w-full h-[25vh] rounded-md object-fill"
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!status || !offerName}
                      onClick={(e) => handleUpdateOffer(e)}
                    >
                      Update
                    </Button>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="apply" className="flex flex-col mt-0 gap-4">
                <div className="flex justify-between mt-4 items-center">
                  <h1 className="text-lg font-bold">Apply Offers</h1>
                </div>
                <div className="flex flex-col gap-4 text-left mt-2">
                  <Label htmlFor="offer">Select Offer To Apply</Label>
                  <Select onValueChange={(e) => handleApplyOfferSelection(e)}>
                    <SelectTrigger id="offer" aria-label="offer">
                      <SelectValue placeholder="Select offer to apply" />
                    </SelectTrigger>
                    <SelectContent>
                      {allOffers?.map((offer, index) => (
                        <SelectItem key={index} value={offer}>
                          {offer?.offerName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Card className="p-4">
                  <form
                    className="flex flex-col gap-8 text-left flex-grow mt-4"
                    onSubmit={(e) => handleApplyOffer(e)}
                  >
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="productcategory">
                        Select Product By Category
                      </Label>
                      <Select onValueChange={(e) => setProductCategory(e)}>
                        <SelectTrigger id="offer" aria-label="offer">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {allCategories?.map((category, index) => (
                            <SelectItem key={index} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        placeholder="Discount %"
                        type="number"
                        required
                        value={selectedOfferToApply?.offerDiscount}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="status">Status</Label>
                      <Input
                        id="status"
                        placeholder="Status"
                        type="text"
                        required
                        value={selectedOfferToApply?.status}
                        readOnly
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        selectedOfferToApply?.status === "Inactive"
                          ? true
                          : false || !productCategory
                      }
                    >
                      Apply Offer
                    </Button>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
            <Card className="overflow-hidden col-span-3 md:col-span-1 flex flex-col justify-between">
              <div>
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Available Offers
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm text-left">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allOffers?.map((offer, index) => (
                        <TableRow key={index}>
                          <TableCell>{offer.offerName}</TableCell>
                          <TableCell className="text-center">
                            {offer.offerDiscount} %
                          </TableCell>
                          <TableCell>{offer.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </div>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Created <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminCreateOffer;
