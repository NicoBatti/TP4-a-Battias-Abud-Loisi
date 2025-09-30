// export POSTGRES_HOST=ep-blue-feather-a4ve7rp2.us-east-1.aws.neon 
// export POSTGRES_USER=default
// export POSTGRES_PASSWORD=xxxxx
// 


export const config = {
    host :process.env.PGHOST,
    database:process.env.PGDATABASE,
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
    port:5432,
    ssl: {
        // En muchos casos, basta con poner 'true'
        // Pero para Neon, a veces es necesario especificar 'rejectUnauthorized: false'
        // si usas una conexión simple sin archivos de certificado locales.
        rejectUnauthorized: false
    }
}
