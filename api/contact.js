export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name = '', phone = '', service = '', message = '' } = req.body ?? {};

  if (!name.trim() || !phone.trim() || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const recipient = process.env.FORMSUBMIT_EMAIL;

  if (!recipient) {
    return res.status(500).json({ success: false, error: 'FORMSUBMIT_EMAIL is not configured' });
  }

  try {
    const upstreamResponse = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        name,
        phone,
        service,
        message,
        _captcha: 'false',
        _subject: 'New Service Request from Website',
      }).toString(),
    });

    const responseText = await upstreamResponse.text();
    let result;

    try {
      result = responseText ? JSON.parse(responseText) : null;
    } catch {
      result = null;
    }

    if (!upstreamResponse.ok || !(result && (result.success === true || result.success === 'true'))) {
      return res.status(502).json({
        success: false,
        error: 'FormSubmit rejected the submission',
        upstreamStatus: upstreamResponse.status,
        details: result ?? responseText,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('FormSubmit error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal submission error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
