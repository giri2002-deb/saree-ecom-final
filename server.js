// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("🛂 Login Attempt:", email);

  const { data, error } = await supabase
    .from('adminlogin')
    .select('*')
    .eq('mail', email)
    .eq('password', password)
    .maybeSingle();

  console.log("📦 Supabase result:", data);
  console.log("❌ Supabase error:", error);

  if (error || !data) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  return res.json({ success: true, message: 'Login successful' });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
