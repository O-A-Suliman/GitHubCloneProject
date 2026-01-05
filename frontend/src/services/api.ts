import axios from 'axios'

// ✅ تكوين baseURL بناءً على بيئة التطوير
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ✅ Interceptor للطلبات: إضافة التوكن تلقائياً
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// ✅ Interceptor للاستجابات: معالجة الأخطاء
api.interceptors.response.use(
  response => response,
  error => {
    // معالجة حالة عدم الاتصال بالسيرفر
    if (!error.response) {
      console.error('خطأ في الاتصال: السيرفر قد يكون متوقفاً')
      error.message = 'فشل الاتصال بالسيرفر. تأكد من تشغيل Django.'
    }
    // معالجة خطأ 401 (غير مصرح)
    else if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
