// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ Admin login route
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('adminlogin')
    .select('*')
    .eq('mail', email)
    .eq('password', password)
    .maybeSingle();

  if (error || !data) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  return res.json({ success: true, message: 'Login successful' });
});

// ✅ Get all sarees
app.get('/api/sarees', async (req, res) => {
  const { data, error } = await supabase
    .from('sarees')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching sarees:', error.message);
    return res.status(500).json({ error: 'Failed to fetch sarees' });
  }

  res.json(data);
});

// ✅ Get single saree by ID
app.get('/api/sarees/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('sarees')
    .select('*')
    .eq('id', req.params.id)
    .maybeSingle();

  if (error || !data) {
    return res.status(404).json({ error: 'Saree not found' });
  }

  res.json(data);
});

// ✅ Create new saree
app.post('/api/sarees', async (req, res) => {
  try {
    const {
      name, category, price, originalPrice, image, images,
      description, features, isNew, isFeatured, rating
    } = req.body;

    const { data, error } = await supabase
      .from('sarees')
      .insert([{
        name,
        category,
        price,
        original_price: originalPrice,
        image,
        images,
        description,
        features,
        is_new: isNew,
        is_featured: isFeatured,
        rating
      }])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating saree:', error.message);
      return res.status(500).json({ error: 'Failed to create saree', details: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Unexpected error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Update saree
app.put('/api/sarees/:id', async (req, res) => {
  try {
    const {
      name, category, price, originalPrice, image, images,
      description, features, isNew, isFeatured, rating
    } = req.body;

    const { data, error } = await supabase
      .from('sarees')
      .update({
        name,
        category,
        price,
        original_price: originalPrice,
        image,
        images,
        description,
        features,
        is_new: isNew,
        is_featured: isFeatured,
        rating,
        updated_at: new Date()
      })
      .eq('id', req.params.id)
      .select()
      .maybeSingle();

    if (error || !data) {
      return res.status(404).json({ error: 'Saree not found or update failed', details: error?.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Unexpected error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Delete saree
app.delete('/api/sarees/:id', async (req, res) => {
  const { error } = await supabase
    .from('sarees')
    .delete()
    .eq('id', req.params.id);

  if (error) {
    console.error('Error deleting saree:', error.message);
    return res.status(500).json({ error: 'Delete failed' });
  }

  res.status(204).send();
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
