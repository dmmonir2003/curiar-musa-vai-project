/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import useCreateOrEdit from "../hooks/useCreateOrEdit";

const AddItems = ({ close }) => {
  const fileInputRef = useRef(null);
  const { submitData } = useCreateOrEdit();
  const [popularitems, setPopularItems] = useState([]);
  const [allitems, setAllItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showproduct, setShowProduct] = useState("");

  const [productname, setProductName] = useState("");
  const [prolength, setProLength] = useState("");
  const [prowidth, setProWidth] = useState("");
  const [proheight, setProHeight] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const includesitems = [
    { id: 1, name: "Glass" },
    { id: 2, name: "Wood" },
    { id: 3, name: "Metal" },
    { id: 4, name: "Plastic" },
    { id: 5, name: "Ceramic" },
  ];

  // Fetch items from API
  const fetchItems = async (searchQuery = "") => {
    try {
      setLoading(true);
      const response = await submitData(
        "/admin/get-items", 
        { searchQuery:searchTerm },
        "POST"
      );
      
      if (response.data && response.data.data) {
        const items = response.data.data.users?.map(item => ({
          id: item._id,
          name: item.name,
          length: item.length,
          width: item.width,
          height: item.height,
          price: item.price,
          image: item.image,
          material: item.material || "",
          createdAt: item.createdAt
        }));
        
        setAllItems(items);
        setPopularItems(items.slice(0, 5)); // First 5 as popular items
      }
    } catch (error) {
      toast.error("Failed to fetch items");
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }



  // Initial fetch
  useEffect(() => {
    fetchItems();
  }, [searchTerm]);

  const show_item_data = (item) => {
    if (!item) {
      // Manual item creation - reset form
      setProductName("");
      setProLength("");
      setProHeight("");
      setProWidth("");
      setMaterial("");
      setImage("");
      setQty(1);
      setPrice(0);
    } else {
      // Prefill from API item
      setProductName(item.name);
      setProLength(item.length);
      setProHeight(item.height);
      setProWidth(item.width);
      setMaterial(item.material || "");
      setImage(item.image || "");
      setPrice(item.price || 0);
    }
    setShowProduct(item || {});
  };

  const addQuantity = () => setQty(qty + 1);
  const subQuantity = () => qty > 1 && setQty(qty - 1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => fileInputRef.current.click();

  const saveProductToLocalStorage = (product) => {
    const itemsList = JSON.parse(localStorage.getItem("itemslist")) || [];
    itemsList.push(product);
    localStorage.setItem("itemslist", JSON.stringify(itemsList));
  };

  const saveItemsProductsList = () => {
    if (!productname || !prolength || !prowidth || !proheight) {
      toast.error("Please fill all required fields");
      return;
    }

    const prolist = {
      name: productname,
      length: prolength,
      width: prowidth,
      height: proheight,
      material: material,
      image: image,
      qty: qty,
      price: price || 0,
    };

    saveProductToLocalStorage(prolist);
    toast.success("Item added successfully");
    close();
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {showproduct === "" ? (
        <div className="border border-[#f0f0f0] rounded-xl p-1 flex items-center gap-1 mb-2 cursor-pointer">
          <span className="ml-2">
            <IoSearch color="#92939E" size={20} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items"
            className="p-2 w-full outline-none"
          />
        </div>
      ) : null}

      <div className={`${showproduct === "" && "border-t pt-3 mt-3"} w-full border-[#f0f0f0]`}>
        {showproduct !== "" ? (
          <div>
            <div className="flex flex-col gap-2 mb-3">
              <label>Product Name *</label>
              <input
                type="text"
                className="form-control !pl-4"
                value={productname}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label>Check dimensions (l x w x h) *</label>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="number"
                    className="form-control !pl-4 !w-full"
                    value={prolength}
                    placeholder="L"
                    onChange={(e) => setProLength(e.target.value)}
                    required
                  />
                  <span className="absolute right-3 top-[12px]">cm</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    className="form-control !pl-4 !w-full"
                    value={prowidth}
                    placeholder="W"
                    onChange={(e) => setProWidth(e.target.value)}
                    required
                  />
                  <span className="absolute right-3 top-[12px]">cm</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    className="form-control !pl-4 !w-full"
                    value={proheight}
                    placeholder="H"
                    onChange={(e) => setProHeight(e.target.value)}
                    required
                  />
                  <span className="absolute right-3 top-[12px]">cm</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-3 mt-3">
              <label>Does it contain any of these materials?</label>
              <div className="grid grid-cols-5 gap-4">
                {includesitems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setMaterial(item.name)}
                    className={`${
                      material === item.name
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-white"
                    } p-3 rounded-full shadow-md flex justify-center text-[#616164] cursor-pointer`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex flex-row p-3 border items-center hover:border-[var(--primary-color)] cursor-pointer border-[#f0f0f0] rounded-lg gap-5 mb-3 mt-6"
              onClick={handleDivClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div>
                {image ? (
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="h-16 w-16 object-cover rounded" 
                  />
                ) : (
                  <svg
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.125 20.3749L25.1102 15.3602C24.5008 14.7509 23.6743 14.4086 22.8125 14.4086C21.9507 14.4086 21.1242 14.7509 20.5148 15.3602L5.75 30.1249M4.125 0.875H26.875C28.6699 0.875 30.125 2.33007 30.125 4.125V26.875C30.125 28.6699 28.6699 30.125 26.875 30.125H4.125C2.33007 30.125 0.875 28.6699 0.875 26.875V4.125C0.875 2.33007 2.33007 0.875 4.125 0.875ZM13.875 10.625C13.875 12.4199 12.4199 13.875 10.625 13.875C8.83007 13.875 7.375 12.4199 7.375 10.625C7.375 8.83007 8.83007 7.375 10.625 7.375C12.4199 7.375 13.875 8.83007 13.875 10.625Z"
                      stroke="#92939E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p className="uppercase text-[11px] text-[var(--primary-color)] font-semibold">
                  Upload a picture
                </p>
                <span className="text-[#616164]">
                  Visual representation of the item
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-3 mt-3 ">
              <label>Quantity *</label>
              <div className="flex justify-between gap-4 p-2 px-4 border items-center border-[#f0f0f0] rounded-lg">
                <div className="cursor-pointer" onClick={subQuantity}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="18" height="18" rx="5" fill="#85E211" />
                    <path
                      d="M3.75 9H14.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="font-bold text-lg text-[#4f4f4f]">{qty}</div>
                <div className="cursor-pointer" onClick={addQuantity}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="18" height="18" rx="5" fill="#85E211" />
                    <path
                      d="M3.75 9H14.25M9 3.75V14.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label>Price ($)</label>
              <input
                type="number"
                className="form-control !pl-4"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                className="website_button flex-1 justify-center !px-8 bg-gray-200 text-gray-700 hover:bg-gray-300 uppercase flex items-center gap-3"
                onClick={() => setShowProduct("")}
              >
                Back
              </button>
              <button
                className="website_button flex-1 justify-center !px-8 hover:bg-[#202020] bg-[var(--primary-color)] uppercase flex items-center gap-3"
                onClick={saveItemsProductsList}
              >
                Add Item
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-1 flex flex-col w-full max-h-[60vh] overflow-y-auto">
              {popularitems.length > 0 ? (
                popularitems.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full items-center justify-between gap-3 bg-white shadow-lg py-3 px-5 rounded-lg mb-2 cursor-pointer border border-transparent hover:border-[#f0f0f0]"
                    onClick={() => show_item_data(item)}
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-10 w-10 object-cover rounded"
                        />
                      )}
                      <span className="text-[14px] capitalize text-[#92939E]">
                        {item.name}
                      </span>
                    </div>
                    <MdKeyboardArrowRight size={20} color="#92939E" />
                  </div>
                ))
              ) : !loading && (
                <div className="text-center py-4 text-gray-500">
                  No items found
                </div>
              )}
            </div>
            <div
              className="flex w-full items-center justify-between gap-3 bg-white shadow-lg py-3 px-5 rounded-lg mb-2 cursor-pointer border border-transparent hover:border-[#f0f0f0]"
              onClick={() => show_item_data(null)}
            >
              <span className="text-[14px] capitalize text-[#92939E]">
                Add custom item
              </span>
              <MdKeyboardArrowRight size={20} color="#92939E" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddItems;