import {
  useEffect,
  useState,
} from "react";

import {
  getCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
} from "../../api/campaignApi";

function Campaigns() {
  const [campaigns, setCampaigns] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      location: "",
      date: "",
      description: "",
    });

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns =
    async () => {
      const res =
        await getCampaigns();

      setCampaigns(
        res.campaigns
      );
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (editingId) {
        await updateCampaign(
          editingId,
          formData
        );
      } else {
        await addCampaign(
          formData
        );
      }

      setFormData({
        title: "",
        location: "",
        date: "",
        description: "",
      });

      setEditingId(null);

      loadCampaigns();
    };

  const handleEdit = (
    campaign
  ) => {
    setEditingId(
      campaign._id
    );

    setFormData(campaign);
  };

  const handleDelete =
    async (id) => {
      if (
        window.confirm(
          "Delete Campaign?"
        )
      ) {
        await deleteCampaign(
          id
        );

        loadCampaigns();
      }
    };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        Campaigns
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >
        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Campaign Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Location"
            value={
              formData.location
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                location:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

        </div>

        <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded">
          {editingId
            ? "Update"
            : "Add Campaign"}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4">
                Title
              </th>

              <th className="p-4">
                Location
              </th>

              <th className="p-4">
                Date
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {campaigns.map(
              (campaign) => (
                <tr
                  key={
                    campaign._id
                  }
                  className="border-b"
                >
                  <td className="p-4">
                    {
                      campaign.title
                    }
                  </td>

                  <td className="p-4">
                    {
                      campaign.location
                    }
                  </td>

                  <td className="p-4">
                    {
                      campaign.date
                    }
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleEdit(
                          campaign
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-2 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          campaign._id
                        )
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Campaigns;