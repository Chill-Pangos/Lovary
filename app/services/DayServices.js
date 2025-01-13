import AsyncStorage from '@react-native-async-storage/async-storage';

const storeFirstDate = async () => {
  try {
    const firstDate = new Date().toISOString(); // Ngày hiện tại
    await AsyncStorage.setItem('firstDate', firstDate);
  } catch (e) {
    console.error('Error storing the date:', e);
  }
};

const getFirstDate = async () => {
  try {
    const storedDate = await AsyncStorage.getItem('firstDate');
    return storedDate ? new Date(storedDate) : null;
  } catch (e) {
    console.error('Error retrieving the date:', e);
    return null;
  }
};

const calculateDays = (startDate) => {
    const currentDate = new Date();
    const diffTime = currentDate - startDate; 
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

const getDaysInLove = async () => {
    const firstDate = await getFirstDate();
    if (!firstDate) {
        await storeFirstDate();
        return 0;
      } else {
        const days = calculateDays(firstDate);
        return days;
      }
}
  
const DayService = {
    storeFirstDate,
    getFirstDate,
    calculateDays,
    getDaysInLove,
}

export default DayService