<script setup>
import { ref, computed } from 'vue'
import { useOrderStore } from '../stores/orderStore'



defineProps({
  isOpen: Boolean
})

defineEmits(['close', 'reorder'])

const orderStore = useOrderStore()
const searchQuery = ref('')

// Direct localStorage check to ensure it reads the Khmer toggle instantly
const isKhmer = computed(() => {
  if (typeof window === 'undefined') return false
  const lang = localStorage.getItem('language') || localStorage.getItem('lang') || ''
  return lang.toLowerCase().includes('km') || document.documentElement.lang === 'km'
})

const translations = {
  en: {
    title: 'Order History',
    clear: 'Clear All',
    searchPlaceholder: 'Search by Order ID or dish...',
    noOrdersTitle: 'No past orders',
    noOrdersSub: 'Your completed checkouts will appear here.',
    noMatchTitle: 'No matching orders found',
    totalPaid: 'Total Paid',
    orderAgain: 'Order Again'
  },
  km: {
    title: 'ប្រវត្តិការបញ្ជាទិញ',
    clear: 'លុបទាំងអស់',
    searchPlaceholder: 'ស្វែងរកតាមលេខកូដ ឬ មុខម្ហូប...',
    noOrdersTitle: 'មិនមានប្រវត្តិការបញ្ជាទិញទេ',
    noOrdersSub: 'ការបញ្ជាទិញដែលបានបញ្ចប់របស់អ្នកនឹងបង្ហាញនៅទីនេះ។',
    noMatchTitle: 'រកមិនឃើញការបញ្ជាទិញដែលត្រូវគ្នាទេ',
    totalPaid: 'សរុបប្រាក់',
    orderAgain: 'បញ្ជាទិញម្តងទៀត'
  }
}

const t = computed(() => (isKhmer.value ? translations.km : translations.en))

const filteredOrders = computed(() => {
  if (!searchQuery.value) return orderStore.orders
  const query = searchQuery.value.toLowerCase()
  return orderStore.orders.filter(order => 
    order.id.toLowerCase().includes(query) ||
    order.items.some(item => item.strMeal.toLowerCase().includes(query))
  )
})
</script>