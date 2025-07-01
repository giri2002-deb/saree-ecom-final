import React, { useState } from 'react';
import { X, Database, Copy, Check, AlertTriangle, ExternalLink, CheckCircle, Zap } from 'lucide-react';

interface SupabaseSetupProps {
  onClose: () => void;
}

const SupabaseSetup: React.FC<SupabaseSetupProps> = ({ onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // IMMEDIATE FIX for the RLS error
  const quickFixSQL = `-- QUICK FIX: Disable RLS on storage.objects (run this first)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Create the saree-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('saree-images', 'saree-images', true)
ON CONFLICT (id) DO NOTHING;`;

  const createTableSQL = `-- Create the sarees table
CREATE TABLE IF NOT EXISTS public.sarees (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC NOT NULL,
    image TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    description TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    is_new BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    rating NUMERIC DEFAULT 5.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on sarees table
ALTER TABLE public.sarees ENABLE ROW LEVEL SECURITY;

-- Create policies for public access on sarees table
CREATE POLICY "Allow public read access" ON public.sarees
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.sarees
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.sarees
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON public.sarees
    FOR DELETE USING (true);`;

  const properStorageSQL = `-- PROPER STORAGE SETUP (use after quick fix works)
-- First, re-enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

-- Create comprehensive storage policies for saree-images bucket
CREATE POLICY "Allow public read on saree-images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'saree-images' );

CREATE POLICY "Allow public insert on saree-images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'saree-images' );

CREATE POLICY "Allow public update on saree-images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'saree-images' );

CREATE POLICY "Allow public delete on saree-images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'saree-images' );`;

  // Using environment variables that would be set in .env
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const isConfigured = supabaseUrl && supabaseAnonKey && 
                      supabaseUrl !== 'your-supabase-url' && 
                      supabaseAnonKey !== 'your-supabase-anon-key';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Database className="h-6 w-6 text-green-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">🔧 Fix Storage RLS Error</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* URGENT FIX */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <div className="flex items-start">
              <Zap className="h-6 w-6 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-800">🚨 IMMEDIATE FIX REQUIRED</h3>
                <p className="text-sm text-red-700 mt-1 mb-3">
                  <strong>Error:</strong> "new row violates row-level security policy"<br/>
                  <strong>Solution:</strong> Run this SQL immediately to fix the storage upload error:
                </p>
                
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-red-800">🔥 QUICK FIX SQL (Run This Now!)</span>
                    <button
                      onClick={() => copyToClipboard(quickFixSQL, 'quickfix')}
                      className="flex items-center px-3 py-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded transition-colors"
                    >
                      {copied === 'quickfix' ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                      Copy & Run
                    </button>
                  </div>
                  <pre className="text-xs text-red-900 bg-white p-3 rounded border overflow-x-auto">
                    <code>{quickFixSQL}</code>
                  </pre>
                </div>

                <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Steps:</strong><br/>
                    1. Go to your Supabase Dashboard → SQL Editor<br/>
                    2. Copy and paste the SQL above<br/>
                    3. Click "Run" to execute<br/>
                    4. Refresh your app and try uploading again
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Status */}
          <div className={`border rounded-lg p-4 ${
            isConfigured 
              ? 'bg-green-50 border-green-200' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-start">
              {isConfigured ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
              )}
              <div>
                <h3 className={`text-sm font-medium ${
                  isConfigured ? 'text-green-800' : 'text-amber-800'
                }`}>
                  {isConfigured ? 'Supabase Configured!' : 'Supabase Configuration Required'}
                </h3>
                <p className={`text-sm mt-1 ${
                  isConfigured ? 'text-green-700' : 'text-amber-700'
                }`}>
                  {isConfigured 
                    ? 'Your Supabase project is configured. Run the quick fix above to resolve the storage error.'
                    : 'Please set up your Supabase environment variables first.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Complete Setup Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Complete Setup Guide</h3>
            
            <div className="space-y-3">
              {!isConfigured && (
                <>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Create Supabase Project</h4>
                      <p className="text-sm text-gray-600">Create a new project at supabase.com</p>
                      <a
                        href="https://supabase.com/dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open Supabase Dashboard
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Configure Environment Variables</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Add these to your .env file (get values from Supabase Settings → API)
                      </p>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        <div>VITE_SUPABASE_URL=your-project-url</div>
                        <div>VITE_SUPABASE_ANON_KEY=your-anon-key</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">{isConfigured ? '1' : '3'}</span>
                <div>
                  <h4 className="font-medium text-gray-900">Create Database Table</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Run this SQL in Supabase SQL Editor to create the sarees table
                  </p>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Database Schema</span>
                      <button
                        onClick={() => copyToClipboard(createTableSQL, 'table')}
                        className="flex items-center px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        {copied === 'table' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <pre className="text-xs text-gray-800 bg-gray-100 p-3 rounded overflow-x-auto max-h-40">
                      <code>{createTableSQL}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">{isConfigured ? '2' : '4'}</span>
                <div>
                  <h4 className="font-medium text-gray-900">🔧 Fix Storage (CRITICAL)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>This step fixes your current error.</strong> Use the Quick Fix above first, then optionally run this for better security:
                  </p>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Proper Storage Policies (Optional)</span>
                      <button
                        onClick={() => copyToClipboard(properStorageSQL, 'storage')}
                        className="flex items-center px-2 py-1 text-xs bg-blue-200 hover:bg-blue-300 rounded transition-colors"
                      >
                        {copied === 'storage' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <pre className="text-xs text-gray-800 bg-blue-50 border border-blue-200 p-3 rounded overflow-x-auto max-h-40">
                      <code>{properStorageSQL}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Summary</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• The storage RLS error can be fixed immediately with the Quick Fix SQL</li>
              <li>• Create your database table using the provided schema</li>
              <li>• Configure environment variables for full integration</li>
              <li>• Optionally implement proper storage policies for better security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseSetup;