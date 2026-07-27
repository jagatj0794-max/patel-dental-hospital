console.log(Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('DATABASE') || k.includes('POSTGRES') || k.includes('KEY') || k.includes('URL')));
console.log('DATABASE_URL is set:', !!process.env.DATABASE_URL);
console.log('SUPABASE_SERVICE_KEY is set:', !!process.env.SUPABASE_SERVICE_KEY);
