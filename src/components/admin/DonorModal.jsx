import { useState, useEffect } from "react";

function DonorModal({
  isOpen,
  onClose,
  onSave,
  donor,
}) {
  const [formData, setFormData] =
    useState({
      donorName: "",
      bloodGroup: "",
      units: "",
      city: "",
      contact: "",
    });

  useEffect(() => {
    if (donor) {
      setFormData(donor);
    }
  }, [donor]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl w-[500px]">

        <h2 className="text-3xl font-bold mb-6">
          {donor
            ? "Edit Donor"
            : "Add Donor"}
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Donor Name"
            className="w-full border p-3 rounded"
            value={formData.donorName}
            onChange={(e) =>
              setFormData({
                ...formData,
                donorName:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Blood Group"
            className="w-full border p-3 rounded"
            value={formData.bloodGroup}
            onChange={(e) =>
              setFormData({
                ...formData,
                bloodGroup:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Units"
            className="w-full border p-3 rounded"
            value={formData.units}
            onChange={(e) =>
              setFormData({
                ...formData,
                units:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="City"
            className="w-full border p-3 rounded"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Contact"
            className="w-full border p-3 rounded"
            value={formData.contact}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact:
                  e.target.value,
              })
            }
          />

          <button
            onClick={() =>
              onSave(formData)
            }
            className="w-full bg-red-600 text-white py-3 rounded-lg"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default DonorModal;