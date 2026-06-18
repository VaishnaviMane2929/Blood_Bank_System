import {
  useEffect,
  useState,
} from "react";

import {
  getStocks,
  addStock,
  updateStock,
  deleteStock,
} from "../../api/bloodStockApi";

function BloodStock() {
  const [stocks, setStocks] =
    useState([]);

  const [formData, setFormData] =
    useState({
      bloodGroup: "",
      units: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    const res = await getStocks();

    setStocks(res.stocks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateStock(
        editingId,
        formData
      );
    } else {
      await addStock(formData);
    }

    setFormData({
      bloodGroup: "",
      units: "",
    });

    setEditingId(null);

    loadStocks();
  };

  const handleEdit = (stock) => {
    setEditingId(stock._id);

    setFormData({
      bloodGroup:
        stock.bloodGroup,
      units: stock.units,
    });
  };

  const handleDelete = async (
    id
  ) => {
    if (
      window.confirm(
        "Delete Blood Stock?"
      )
    ) {
      await deleteStock(id);

      loadStocks();
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        Blood Stock
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Blood Group"
            value={
              formData.bloodGroup
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                bloodGroup:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Units"
            value={formData.units}
            onChange={(e) =>
              setFormData({
                ...formData,
                units:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />
        </div>

        <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded">
          {editingId
            ? "Update Stock"
            : "Add Stock"}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4">
                Blood Group
              </th>

              <th className="p-4">
                Units
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((stock) => (
              <tr
                key={stock._id}
                className="border-b"
              >
                <td className="p-4">
                  {
                    stock.bloodGroup
                  }
                </td>

                <td className="p-4">
                  {stock.units}
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      handleEdit(
                        stock
                      )
                    }
                    className="bg-blue-600 text-white px-3 py-2 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        stock._id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BloodStock;