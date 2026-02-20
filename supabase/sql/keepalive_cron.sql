select
  cron.schedule(
    'keepalive-job', -- name of the cron job
    '0 */12 * * *', -- schedule: every 12 hours (at minute 0)
    $$
    select
      net.http_post(
        url := 'https://PROJECT_ID.supabase.co/functions/v1/keepalive',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'x-cron-key', 'YOUR_CRON_SECRET' -- Replace with your actual long random string
        )
      ) as request_id;
    $$
  );
