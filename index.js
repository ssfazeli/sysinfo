const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// اتصال به MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// مدل دیتابیس
const HardwareInfo = mongoose.model('HardwareInfo', new mongoose.Schema({
  cpu: String,
  ram: String,
  os: String
}));

// مسیر اصلی (Root Route)
app.get('/', (req, res) => {
  res.send('Welcome to the Hardware Info Collector!');
});

// ذخیره اطلاعات سخت افزاری
app.post('/submit', async (req, res) => {
  const hardwareInfo = new HardwareInfo(req.body);
  await hardwareInfo.save();
  res.send('Hardware info saved!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
