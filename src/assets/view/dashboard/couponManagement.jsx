import React, { useEffect, useState } from "react";
import axios from "axios";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: "", description: "", usageLimit: "", expiresAt: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const fetchCoupons = async () => {
    const { data } = await axios.get(`${API}/coupon`);
    setCoupons(data.data);
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      discountPercent: 5,
      usageLimit: form.usageLimit ? parseInt(form.usageLimit) : null,
      expiresAt: form.expiresAt || null,
    };
    try {
      if (editId) {
        await axios.put(`${API}/coupon/${editId}`, payload);
      } else {
        await axios.post(`${API}/coupon`, payload);
      }
      setForm({ code: "", description: "", usageLimit: "", expiresAt: "" });
      setEditId(null);
      fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving coupon");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this coupon?")) return;
    await axios.delete(`${API}/coupon/${id}`);
    fetchCoupons();
  };

  const handleToggle = async (coupon) => {
    await axios.put(`${API}/coupon/${coupon._id}`, { isActive: !coupon.isActive });
    fetchCoupons();
  };

  const handleEdit = (coupon) => {
    setEditId(coupon._id);
    setForm({
      code: coupon.code,
      description: coupon.description,
      usageLimit: coupon.usageLimit ?? "",
      expiresAt: coupon.expiresAt ? coupon.expiresAt.slice(0, 10) : "", 
    });
};

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl text-center pt-12 font-bold text-blue-700 mb-6">Coupon Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-5 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Coupon Code *</label>
          <input required className="w-full border rounded p-2 uppercase"
            value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
            placeholder="e.g. SAVE5" disabled={!!editId} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input className="w-full border rounded p-2"
            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Optional description" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Usage Limit (blank = unlimited)</label>
          <input type="number" className="w-full border rounded p-2"
            value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: e.target.value })}
            placeholder="e.g. 100" min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expires At (blank = never)</label>
          <input type="date" className="w-full border rounded p-2"
            value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">
            {editId ? "Update Coupon" : "Create Coupon"}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ code: "", description: "", usageLimit: "", expiresAt: "" }); }}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Used / Limit</th>
              <th className="p-3">Expires</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c, i) => (
              <tr key={c._id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-mono font-bold">{c.code}</td>
                <td className="p-3 text-center">{c.discountPercent}%</td>
                <td className="p-3 text-center">{c.usedCount} / {c.usageLimit ?? "∞"}</td>
                <td className="p-3 text-center">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : "Never"}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button onClick={() => handleEdit(c)} className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleToggle(c)} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    {c.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">No coupons yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponManagement;