import { useState } from "react";

function RequestModal({
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] =
    useState(
      initialData || {
        patientName: "",
        bloodGroup: "",
        unitsRequired: "",
        hospital: "",
        city: "",
        contact: "",
        status: "Pending",
      }
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl w-[600px]">

        <h2 className="text-3xl font-bold mb-6">
          {initialData
            ? "Edit Request"
            : "Add Request"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={(e) =>
              setFormData({
                ...formData,
                patientName:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={(e) =>
              setFormData({
                ...formData,
                bloodGroup:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Units Required"
            value={
              formData.unitsRequired
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                unitsRequired:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Hospital"
            value={formData.hospital}
            onChange={(e) =>
              setFormData({
                ...formData,
                hospital:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Contact"
            value={formData.contact}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default RequestModal;