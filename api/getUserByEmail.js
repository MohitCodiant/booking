// /api/getUserByEmail.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://feyekepbasnfmdoqnktc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleWVrZXBiYXNuZm1kb3Fua3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2OTE4OTUsImV4cCI6MjA1MDI2Nzg5NX0._pijwGhgZYbGX-zkRESjif3N5hv1SfAUjIrrGdso3DA"
);

export default async function handler(req, res) {
  const { identifier } = req.query;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", identifier)
      .single();

    if (error) throw error;

    res.status(200).json({
      status: "success",
      message: "User fetched successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
}
