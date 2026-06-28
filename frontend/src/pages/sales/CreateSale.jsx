import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import { getMedicines } from "../../api/medicineApi";
import { createSale } from "../../api/saleApi";

function CreateSale() {

  const [medicineOptions, setMedicineOptions] =
    useState([]);

  const [items, setItems] = useState([
    {
      medicine: null,
      quantity: 1,
      sellingPrice: 0,
      subtotal: 0,
      stock: 0,
    },
  ]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {

      const response =
        await getMedicines({
          limit: 1000,
        });

      const options =
        response.medicines.map(
          (medicine) => ({
            value: medicine._id,
            label: medicine.name,
            sellingPrice:
              medicine.sellingPrice,
            stock:
              medicine.quantity,
          })
        );

      setMedicineOptions(options);

    } catch (error) {

      toast.error(
        "Failed to load medicines"
      );

    }
  };

  const handleMedicineChange = (selectedMedicine, index) => {
  const updatedItems = [...items];

  updatedItems[index].medicine = selectedMedicine;

  updatedItems[index].sellingPrice = Number(
    selectedMedicine.sellingPrice
  );

  updatedItems[index].stock = Number(
    selectedMedicine.stock
  );

  updatedItems[index].subtotal =
    updatedItems[index].quantity *
    Number(selectedMedicine.sellingPrice);

  setItems(updatedItems);
};

const handleQuantityChange = (value, index) => {
  const updatedItems = [...items];

  updatedItems[index].quantity = Number(value);

  updatedItems[index].subtotal =
    Number(value) *
    updatedItems[index].sellingPrice;

  setItems(updatedItems);
};

const handleAddRow = () => {
  setItems([
    ...items,
    {
      medicine: null,
      quantity: 1,
      sellingPrice: 0,
      subtotal: 0,
      stock: 0,
    },
  ]);
};

const handleRemoveRow = (index) => {
  if (items.length === 1) return;

  setItems(items.filter((_, i) => i !== index));
};

  const grandTotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.subtotal,
      0
    );
  }, [items]);

  const handleCreateSale = async () => {
  const medicineIds = new Set();

  const medicines = [];

  for (const item of items) {
    if (!item.medicine) {
      return toast.error(
        "Please select all medicines"
      );
    }

    if (medicineIds.has(item.medicine.value)) {
      return toast.error(
        "Duplicate medicine selected"
      );
    }

    medicineIds.add(item.medicine.value);

    if (item.quantity <= 0) {
      return toast.error(
        "Invalid quantity"
      );
    }

    if (item.quantity > item.stock) {
      return toast.error(
        `${item.medicine.label} has only ${item.stock} in stock`
      );
    }

    medicines.push({
      medicineId: item.medicine.value,
      quantity: item.quantity,
    });
  }

  try {
    await createSale({
      medicines,
    });

    toast.success("Sale Created");

    fetchMedicines();

    setItems([
      {
        medicine: null,
        quantity: 1,
        sellingPrice: 0,
        subtotal: 0,
        stock: 0,
      },
    ]);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
        "Sale Failed"
    );

  }
};

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-8">
        Create Sale
      </h1>

      {items.map((item, index) => (

        <div
          key={index}
          className="grid md:grid-cols-5 gap-4 border rounded-lg p-4 mb-5"
        >

          <div>

            <label className="block mb-2">
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

            <label className="block mb-2">
              Stock
            </label>

            <input
              readOnly
              value={item.stock}
              className="w-full border rounded-lg p-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2">
              Selling Price
            </label>

            <input
              readOnly
              value={item.sellingPrice}
              className="w-full border rounded-lg p-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2">
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

            <label className="block mb-2">
              Subtotal
            </label>

            <input
              readOnly
              value={item.subtotal}
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
  type="button"
  onClick={handleAddRow}
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
>
  + Add Medicine
</button>

      <h2 className="text-2xl font-bold text-right">

        Grand Total : ₹{grandTotal}

      </h2>

      <div className="mt-8 flex justify-end">

<button
type="button"
onClick={handleCreateSale}
className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
>

Create Sale

</button>

</div>

    </div>
  );
}

export default CreateSale;