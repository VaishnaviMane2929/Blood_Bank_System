function UserProfile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-red-600 mb-8">
        My Profile
      </h1>

      <div className="bg-white p-8 rounded-xl shadow">

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Mobile:</strong> {user?.mobile}
        </p>

        <p>
          <strong>Blood Group:</strong>{" "}
          {user?.bloodGroup}
        </p>

        <p>
          <strong>City:</strong> {user?.city}
        </p>

      </div>
    </div>
  );
}

export default UserProfile;