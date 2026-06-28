import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import { getVendors } from "../../api/vendorApi";
import { getMedicines } from "../../api/medicineApi";
import { createPurchaseOrder } from "../../api/purchaseOrderApi";

function PurchaseOrder() {

  const [vendors, setVendors] = useState([]);

  const [selectedVendor, setSelectedVendor] =
    useState(null);

  const [medicineOptions, setMedicineOptions] =
    useState([]);

  const [items, setItems] = useState([
    {
      medicine: null,
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    },
  ]);

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (selectedVendor) {
      fetchMedicines(
        selectedVendor.value
      );
    }
  }, [selectedVendor]);

  const fetchVendors = async () => {
    try {
      const response =
        await getVendors();

      const options = response.map(
        (vendor) => ({
          value: vendor._id,
          label: vendor.name,
        })
      );

      setVendors(options);

    } catch (error) {

      toast.error(
        "Failed to load vendors"
      );

    }
  };

  const fetchMedicines = async (
    vendorId
  ) => {
    try {
      const response =
        await getMedicines({
          vendorId,
        });

      const options =
        response.medicines.map(
          (medicine) => ({
            value: medicine._id,
            label: medicine.name,
            purchasePrice:
              medicine.purchasePrice,
          })
        );

      setMedicineOptions(options);

      setItems([
        {
          medicine: null,
          quantity: 1,
          unitPrice: 0,
          subtotal: 0,
        },
      ]);

    } catch (error) {

      toast.error(
        "Failed to load medicines"
      );

    }
  };

  const handleMedicineChange = (selectedMedicine, index) => {
  const updatedItems = [...items];

  updatedItems[index].medicine = selectedMedicine;
  updatedItems[index].unitPrice =
    Number(selectedMedicine.purchasePrice);

  updatedItems[index].subtotal =
    updatedItems[index].quantity *
    Number(selectedMedicine.purchasePrice);

  setItems(updatedItems);
};

const handleQuantityChange = (value, index) => {
  const updatedItems = [...items];

  updatedItems[index].quantity = Number(value);

  updatedItems[index].subtotal =
    Number(value) *
    updatedItems[index].unitPrice;

  setItems(updatedItems);
};

const handleAddRow = () => {
  setItems([
    ...items,
    {
      medicine: null,
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    },
  ]);
};

const handleRemoveRow = (index) => {
  if (items.length === 1) return;

  const updatedItems = items.filter(
    (_, i) => i !== index
  );

  setItems(updatedItems);
};

  const grandTotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.subtotal,
      0
    );
  }, [items]);

  const handleCreateOrder = async () => {
  if (!selectedVendor) {
    return toast.error("Please select vendor");
  }

  const medicineIds = new Set();

  const medicines = [];

  for (const item of items) {
    if (medicineIds.has(item.medicine.value)) {
  return toast.error(
    "Duplicate medicine selected"
  );
}

medicineIds.add(item.medicine.value);
    if (!item.medicine) {
      return toast.error("Please select all medicines");
    }

    if (item.quantity <= 0) {
      return toast.error("Quantity must be greater than 0");
    }

    medicines.push({
      medicineId: item.medicine.value,
      quantity: Number(item.quantity),
    });
  }

  try {
    const payload = {
      vendorId: selectedVendor.value,
      medicines,
    };

    console.log(payload);

    await createPurchaseOrder(payload);

    toast.success("Purchase Order Created");

    setSelectedVendor(null);

    setMedicineOptions([]);

    setItems([
      {
        medicine: null,
        quantity: 1,
        unitPrice: 0,
        subtotal: 0,
      },
    ]);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to create order"
    );

  }
};

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-8">

        Create Purchase Order

      </h1>

      <div className="mb-8">

        <label className="font-semibold block mb-2">

          Vendor

        </label>

        <Select
          options={vendors}
          value={selectedVendor}
          onChange={setSelectedVendor}
          placeholder="Select Vendor"
        />

      </div>

      {selectedVendor && (

        <div className="space-y-6">

          {items.map((item, index) => (

            <div
              key={index}
              className="grid md:grid-cols-4 gap-4 border rounded-lg p-4"
            >

              <div>

                <label className="block mb-2 font-medium">

                  Medicine

                </label>

                <Select
  options={medicineOptions}
  value={item.medicine}
  onChange={(selectedMedicine) =>
    handleMedicineChange(
      selectedMedicine,
      index
    )
  }
  placeholder="Select Medicine"
/>

              </div>

              <div>

                <label className="block mb-2 font-medium">

                  Quantity

                </label>

                <input
  type="number"
  min={1}
  value={item.quantity}
  onChange={(e) =>
    handleQuantityChange(
      e.target.value,
      index
    )
  }
  className="w-full border rounded-lg p-3"
/>

              </div>

              <div>

                <label className="block mb-2 font-medium">

                  Purchase Price

                </label>

                <input
                  value={item.unitPrice}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100"
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">

                  Subtotal

                </label>

                <input
                  value={item.subtotal}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100"
                />

                             

              </div>
              <button
  type="button"
  onClick={() =>
    handleRemoveRow(index)
  }
  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
>
  Remove
</button>



            </div>

            

          ))}
          

          <button
  onClick={handleAddRow}
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
>
  + Add Medicine
</button>

          <div className="text-right">

            <h2 className="text-2xl font-bold">

              Grand Total : ₹{grandTotal}

            </h2>

          </div>
          <div className="mt-8 flex justify-end">

<button
type="button"
onClick={handleCreateOrder}
className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
>

Create Purchase Order

</button>

</div>

        </div>

      )}

    </div>
  );
}

export default PurchaseOrder;