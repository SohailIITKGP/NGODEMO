# Quick Start Guide / त्वरित आरंभ गाइड

## 🚀 5 Minutes से अपना Platform चालू करें!

### Step 1: Install करें
```bash
bun install
```

### Step 2: Development Server चालू करें
```bash
bun run dev
```

### Step 3: Browser में खोलें
```
http://localhost:5173
```

---

## 🎯 प्रमुख Features को Test करें

### 1️⃣ **Member Registration Test करें**

1. Homepage पर "Become a Member" बटन क्लिक करें
2. या सीधे जाएं: `http://localhost:5173/member-registration`
3. 3-step form भरें:
   - Personal Information
   - Address Details  
   - Upload Documents (कोई भी image file select करें)
4. Submit करें
5. Application ID note कर लें
6. "Check Application Status" पर क्लिक करें
7. Application ID enter करें और status देखें

---

### 2️⃣ **Donation Flow Test करें**

1. Homepage पर scroll करके Projects देखें
2. किसी भी project पर "Donate Now" क्लिक करें
3. Donation form भरें:
   - Amount: ₹1000 (या कोई भी amount)
   - Personal details
   - Optional: PAN number for 80G receipt
4. "Donate Now" बटन क्लिक करें
5. Success page देखें receipt ID के साथ

---

### 3️⃣ **Admin Dashboard Access करें**

1. Navigate to: `http://localhost:5173/admin/login`
2. Demo credentials enter करें:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
3. Dashboard explore करें:

#### Member Approval Tab:
- Pending applications देखें
- "View" बटन से details देखें
- Green checkmark से Approve करें
- Red X से Reject करें

#### Donation Tracking Tab:
- सभी donations देखें
- Search box में donor name search करें
- Total amount देखें

#### Reports Tab:
- Report type select करें (Donations/Members)
- Format select करें (CSV/Excel)
- "Generate Report" क्लिक करें
- File automatically download होगी

---

## 🔄 Language Switch करें

Navigation bar में Globe icon (🌐) पर क्लिक करें
- English ↔️ Hindi आसानी से switch करें
- पूरी website automatically translate हो जाएगी

---

## 📱 Mobile View Test करें

1. Browser में DevTools खोलें (F12)
2. Device toolbar toggle करें (Ctrl + Shift + M)
3. Different mobile sizes test करें:
   - iPhone
   - iPad
   - Android phones

सभी features mobile पर perfectly काम करेंगे! ✅

---

## 💡 Important Notes

### Current Demo Limitations:

1. **Payment Gateway**: 
   - Currently simulated (no real payment)
   - Razorpay integration ready for production

2. **Data Storage**:
   - Using browser's localStorage
   - Data persists but local only
   - For production, integrate backend database

3. **File Uploads**:
   - Files are selected but not actually uploaded
   - File names are stored
   - For production, integrate cloud storage (AWS S3/Cloudinary)

4. **Email/WhatsApp**:
   - Currently simulated with notifications
   - For production, integrate SendGrid + Twilio

5. **PDF Generation**:
   - Currently simulated
   - For production, integrate PDFKit or Puppeteer

---

## 🛠️ Production Ready Checklist

### Backend Setup Required:

- [ ] Setup Node.js/Express or Django backend
- [ ] Configure PostgreSQL or MongoDB database
- [ ] Integrate Razorpay payment gateway
- [ ] Setup AWS S3 for file storage
- [ ] Configure SendGrid for emails
- [ ] Setup Twilio WhatsApp Business API
- [ ] Implement PDF generation service
- [ ] Add QR code generation
- [ ] Setup authentication (JWT/OAuth)
- [ ] Add rate limiting and security
- [ ] Configure CORS properly
- [ ] Setup SSL certificate
- [ ] Deploy to production server

### Frontend Deployment:

```bash
# Build for production
bun run build

# Preview production build locally
bun run preview

# Deploy to Vercel/Netlify/AWS
# Follow their deployment guides
```

---

## 📞 Need Help?

### Common Issues:

**Port already in use?**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
bun run dev -- --port 3000
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm bun.lockb
bun install
```

**Build errors?**
```bash
# Check TypeScript errors
bun run type-check

# Check linting
bun run lint
```

---

## 🎉 अगले Steps

1. ✅ सभी features test करें
2. ✅ अपने organization के लिए customize करें
3. ✅ Backend setup करें
4. ✅ Payment gateway integrate करें
5. ✅ Production पर deploy करें

**Happy Coding! 🚀**

---

## 📚 Additional Resources

- [FEATURES.md](./FEATURES.md) - Complete feature documentation
- [README.md](./README.md) - Project overview
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [React Router Docs](https://reactrouter.com/)
- [Razorpay Docs](https://razorpay.com/docs/)

---

Made with ❤️ for Social Impact Organizations
