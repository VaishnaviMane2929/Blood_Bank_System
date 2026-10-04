import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  HeartPulse,
  Building2,
} from "lucide-react";

import { addContact } from "../api/publicApi";

function Contact() {
  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  // ==========================================
  // INPUT HANDLER
  // ==========================================

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const submitHandler = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }

    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    // ==========================================
    // PHONE VALIDATION
    // ==========================================

    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      setError(
        "Phone number must contain exactly 10 digits."
      );

      return;
    }

    // ==========================================
    // MESSAGE VALIDATION
    // ==========================================

    if (formData.message.trim().length < 10) {
      setError(
        "Message must contain at least 10 characters."
      );

      return;
    }

    try {
      setLoading(true);

      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      console.log(
        "CONTACT DATA:",
        contactData
      );

      // ==========================================
      // API CALL
      // ==========================================

      const response =
        await addContact(contactData);

      console.log(
        "CONTACT RESPONSE:",
        response
      );

      if (response.success) {
        setSuccess(
          "Your message has been sent successfully. We will get back to you soon."
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setError(
          response.message ||
            "Unable to send your message."
        );
      }
    } catch (error) {
      console.error(
        "CONTACT FORM ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ======================================
          HERO
      ====================================== */}

      <section className="bg-red-600 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-semibold">
              <HeartPulse size={18} />

              BLOODCONNECT SUPPORT
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mt-6">
              Contact Us
            </h1>

            <p className="text-red-100 text-lg mt-4 leading-8">
              Have a question, need support, or want to
              know more about our blood donation services?
              Send us a message and our team will assist you.
            </p>

          </div>

        </div>

      </section>

      {/* ======================================
          MAIN SECTION
      ====================================== */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ====================================
              CONTACT INFORMATION
          ==================================== */}

          <div className="lg:col-span-1">

            <div className="bg-red-600 text-white rounded-3xl p-8 h-full">

              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center">
                <MessageSquare size={27} />
              </div>

              <h2 className="text-2xl font-bold mt-6">
                Get In Touch
              </h2>

              <p className="text-red-100 mt-3 leading-7">
                Our team is here to help you with blood
                donation, blood requests and general
                enquiries.
              </p>

              {/* EMAIL */}

              <div className="flex items-start gap-4 mt-10">

                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-red-200 text-sm">
                    Email
                  </p>

                  <a
                    href="mailto:support@bloodconnect.com"
                    className="font-semibold hover:underline"
                  >
                    support@bloodconnect.com
                  </a>
                </div>

              </div>

              {/* PHONE */}

              <div className="flex items-start gap-4 mt-7">

                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-red-200 text-sm">
                    Phone
                  </p>

                  <a
                    href="tel:9876543210"
                    className="font-semibold hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </div>

              </div>

              {/* LOCATION */}

              <div className="flex items-start gap-4 mt-7">

                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-red-200 text-sm">
                    Location
                  </p>

                  <p className="font-semibold">
                    Pune, Maharashtra, India
                  </p>
                </div>

              </div>

              {/* WORKING HOURS */}

              <div className="flex items-start gap-4 mt-7">

                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>

                <div>
                  <p className="text-red-200 text-sm">
                    Support Hours
                  </p>

                  <p className="font-semibold">
                    Monday - Saturday
                  </p>

                  <p className="text-red-100 text-sm mt-1">
                    9:00 AM - 6:00 PM
                  </p>
                </div>

              </div>

              {/* EMERGENCY NOTE */}

              <div className="mt-10 pt-7 border-t border-white/20">

                <p className="text-sm text-red-100 leading-6">
                  For urgent medical emergencies, please
                  contact your nearest hospital or emergency
                  medical service immediately.
                </p>

              </div>

            </div>

          </div>

          {/* ====================================
              CONTACT FORM
          ==================================== */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

              {/* FORM HEADER */}

              <div className="p-7 md:p-10 border-b border-gray-100">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <Send size={26} />
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                      Send Us a Message
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Fill out the form and we will contact you.
                    </p>

                  </div>

                </div>

              </div>

              {/* ====================================
                  SUCCESS
              ==================================== */}

              {success && (
                <div className="mx-7 md:mx-10 mt-7 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">

                  <CheckCircle
                    size={23}
                    className="text-green-600 mt-0.5 shrink-0"
                  />

                  <div>

                    <h3 className="font-semibold text-green-800">
                      Message Sent
                    </h3>

                    <p className="text-green-700 text-sm mt-1">
                      {success}
                    </p>

                  </div>

                </div>
              )}

              {/* ====================================
                  ERROR
              ==================================== */}

              {error && (
                <div className="mx-7 md:mx-10 mt-7 bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">

                  <AlertCircle
                    size={23}
                    className="text-red-600 mt-0.5 shrink-0"
                  />

                  <div>

                    <h3 className="font-semibold text-red-800">
                      Message Not Sent
                    </h3>

                    <p className="text-red-700 text-sm mt-1">
                      {error}
                    </p>

                  </div>

                </div>
              )}

              {/* ====================================
                  FORM
              ==================================== */}

              <form
                onSubmit={submitHandler}
                className="p-7 md:p-10"
              >

                <div className="grid md:grid-cols-2 gap-6">

                  {/* NAME */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>

                    <div className="relative">

                      <User
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={inputHandler}
                        placeholder="Enter your full name"
                        className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                      />

                    </div>

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={inputHandler}
                        placeholder="Enter your email"
                        className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                      />

                    </div>

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={inputHandler}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                      />

                    </div>

                  </div>

                  {/* SUBJECT */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>

                    <div className="relative">

                      <MessageSquare
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={inputHandler}
                        placeholder="Enter subject"
                        className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                      />

                    </div>

                  </div>

                </div>

                {/* MESSAGE */}

                <div className="mt-6">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={inputHandler}
                    placeholder="Write your message here..."
                    rows="6"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition resize-none"
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    Minimum 10 characters
                  </p>

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-7 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={21}
                        className="animate-spin"
                      />

                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={20} />

                      Send Message
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          WHY CONTACT US
      ====================================== */}

      <section className="bg-white border-t border-gray-100 py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">

            <div className="w-14 h-14 mx-auto bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <HeartPulse size={27} />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-5">
              We're Here to Help
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
              Whether you are a donor, patient, hospital,
              or someone looking for blood support, our
              platform is designed to help connect people
              with the right resources.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {/* SUPPORT */}

            <div className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100">

              <div className="w-12 h-12 mx-auto bg-white text-red-600 rounded-xl flex items-center justify-center shadow-sm">
                <MessageSquare size={23} />
              </div>

              <h3 className="font-bold text-gray-800 text-lg mt-5">
                Quick Support
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-6">
                Send us your questions and our team can
                help with general platform enquiries.
              </p>

            </div>

            {/* BLOOD */}

            <div className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100">

              <div className="w-12 h-12 mx-auto bg-white text-red-600 rounded-xl flex items-center justify-center shadow-sm">
                <HeartPulse size={23} />
              </div>

              <h3 className="font-bold text-gray-800 text-lg mt-5">
                Blood Support
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-6">
                Learn more about donor registration and
                blood request services.
              </p>

            </div>

            {/* LOCATION */}

            <div className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100">

              <div className="w-12 h-12 mx-auto bg-white text-red-600 rounded-xl flex items-center justify-center shadow-sm">
                <Building2 size={23} />
              </div>

              <h3 className="font-bold text-gray-800 text-lg mt-5">
                Our Network
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-6">
                Building a connected community of donors
                and people seeking blood support.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;