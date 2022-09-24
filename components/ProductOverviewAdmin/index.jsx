/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import DetailEdit from "./DetailEdit";
import Subdetail from "./Subdetail";

const ProductOverview = ({ details }) => {
  const [editProduct, setEditProduct] = useState(false);
  const handleEdit = () => {
    setEditProduct(true);
  };

  const handleCancelEdit = () => {
    setEditProduct(false);
  };

  return (
    <>
    {
      editProduct ? (<DetailEdit clicktocanceledit={handleCancelEdit} subdetails={details} />) : (<Subdetail clicktoedit={handleEdit} subdetails={details}/>)
    }

    </>
  );
};

export default ProductOverview;
