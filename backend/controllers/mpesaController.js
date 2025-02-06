import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const accessToken = async () => {
  const secret = process.env.MPESA_CONSUMER_SECRET;
  const key = process.env.MPESA_CONSUMER_KEY;
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to fetch access token");
  }
};

const stkPush = async (req, res) => {
  const token = await accessToken();
  const shortCode = process.env.MPESA_SHORTCODE;
  const lipaNaMpesaOnlineUrl =
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const passKey = process.env.MPESA_PASSKEY;
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);
  const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString(
    "base64"
  );

  const { phoneNumber, amount } = req.body;

  try {
    const response = await axios.post(
      lipaNaMpesaOnlineUrl,
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "Order1273",
        TransactionDesc: "Payment for order",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error processing STK Push:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process STK Push",
      error: error.message,
    });
  }
};

const c2bRegisterUrl = async (req, res) => {
  const token = await accessToken();
  const shortCode = process.env.MPESA_SHORTCODE;
  const c2bRegisterUrl = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";

  try {
    const response = await axios.post(
      c2bRegisterUrl,
      {
        ShortCode: shortCode,
        ResponseType: "Completed",
        ConfirmationURL: process.env.MPESA_CONFIRMATION_URL,
        ValidationURL: process.env.MPESA_VALIDATION_URL,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error registering C2B URL:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register C2B URL",
      error: error.message,
    });
  }
};

const mpesaCallback = (req, res) => {
  console.log("MPesa callback:", req.body);
  // Process the callback data and save it to your database
  res.status(200).json({ success: true, message: "Callback received" });
};

export {stkPush,c2bRegisterUrl,mpesaCallback }
