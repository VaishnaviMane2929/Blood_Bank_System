// src/pages/RequestBlood.jsx

function RequestBlood() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        
        <h1 className="text-4xl font-bold text-red-600 mb-10 text-center">
          Request Blood
        </h1>

        <form className="grid md:grid-cols-2 gap-6">
          
          <input type="text" placeholder="Patient Name" className="border p-4 rounded-xl" />

          <input type="text" placeholder="Hospital Name" className="border p-4 rounded-xl" />

          <select className="border p-4 rounded-xl">
            <option>Select Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
          </select>

          <input type="text" placeholder="Required Units" className="border p-4 rounded-xl" />

          <input type="text" placeholder="City" className="border p-4 rounded-xl" />

          <input type="text" placeholder="Contact Number" className="border p-4 rounded-xl" />

          <textarea
            placeholder="Emergency Details"
            className="border p-4 rounded-xl md:col-span-2 h-36"
          ></textarea>

          <button className="md:col-span-2 bg-red-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-red-700">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestBlood;