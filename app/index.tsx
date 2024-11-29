import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const AdCard = ({ image, title, offerText, onClose }) => {
  return (
    <View style={styles.adCard}> 
      <Image source={{ uri: image }} style={styles.adImage} />
      <View style={styles.adTextContainer}>
        <Text style={styles.adTitle}>{title}</Text>
        <Text style={styles.offerText}>{offerText}</Text>
      </View>
      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
        <Icon name="close-circle" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};


const App = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [buttonsAnimation] = useState(new Animated.Value(0));
  const [categoryPosition] = useState(
    new Animated.Value(Dimensions.get('window').height / 2 - 50)
  );


  const products = [
    { 
      name: 'Magenta Pink Barbie Dress',
      image: 'https://www.rajkumari.co/rajdulap/public/uploads/product/LRDULAP00430-4_001694621320.jpg',
      originalPrice: 799,
      price: 599,
      discountPercentage: '40% OFF',
      deliveryTime: '3 Days',
      description: 'A beautiful magenta pink dress perfect for parties and special occasions.',
    },
    { 
      name: 'Blue Summer Dress',
      image: 'https://www.labelbyanuja.in/cdn/shop/files/Screenshot2023-06-05160724.png?v=1685961505&width=1200',
      originalPrice: 899,
      price: 599,
      discountPercentage: '35% OFF',
      deliveryTime: '4 Days',
      description: 'A cool blue dress ideal for the summer weather.',
    },
    {
      name: 'Red Formal Shirt',
      image: 'https://m.media-amazon.com/images/I/61sWDIL5wQL._AC_UY1100_.jpg',
      originalPrice: 799,
      price: 499,
      discountPercentage: '30% OFF',
      deliveryTime: '2 Days',
      description: 'A sleek red shirt, perfect for formal events or office wear.',
    },
    {
      name: 'Stylish Crop Top',
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT3U0B838qo931hk7Q-PHJli0Uf3SKLjMU7-8gBhHlxMJtJWZz1Qcz7s15aHguW21lYF8_-UxyfujhR-lIxzLDAtEDzcQQHwdQvH0L9RVg',
      originalPrice: 699,
      price: 449,
      discountPercentage: '35% OFF',
      deliveryTime: '3 Days',
      description: 'Trendy crop top, perfect for casual outings and a fashionable look.',
    }, 
    {
      name: 'Elegant Slit One Piece',
      image: 'data:image/jpeg;base64,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',
      originalPrice: 1299,
      price: 899,
      discountPercentage: '30% OFF',
      deliveryTime: '5 Days',
      description: 'A stunning slit one-piece dress ideal for evening parties and formal events.',
    },
    {
      name: 'Chic Halter Neck Dress',
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSDBNyyLKVUPUGXRw7HTWdf6QkcB6MRYCYWktRRbSrpjlBvCC9jhE0jv_FQWvwZudnpi5g64wmcZhyT_mjaufCce50wXTfc8l8iCQzG-ZIsGPSmHEUGStwA_w',
      originalPrice: 1099,
      price: 749,
      discountPercentage: '32% OFF',
      deliveryTime: '4 Days',
      description: 'A stylish halter neck dress, perfect for casual and semi-formal gatherings.',
    },
    {
      name: 'Hoodie',
      image: 'https://www.redwolf.in/image/cache/catalog/sweatshirts/premium-hoodies/redwolf-basics-heather-grey-premium-hoodie-india-600x800.jpg?m=1707385218',
      originalPrice: 549,
      price: 499,
      discountPercentage: '10% OFF',
      deliveryTime: '3 Days',
      description: 'A winter wear dress for men',
    },
  ];
  
  const westernWear = [
    {
      name: 'Western Blue Jeans',
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/jean/x/d/q/26-denim-carg-jeans-angel-western-original-imahfpqqvrgbfhyb.jpeg?q=90&crop=false',
      originalPrice: 999,
      price: 799,
      discountPercentage: '20% OFF',
    },
    {
      name: 'Leather Jacket',
      image: 'https://devotedstore.com/cdn/shop/files/1000047445.jpg?v=1720451770',
      originalPrice: 1599,
      price: 1199,
      discountPercentage: '25% OFF',
    },
    {
      name: 'Midi Dress',
      image: 'https://www.ordinaree.com/cdn/shop/files/Ordinaree-360_d66cdc6b-8033-442d-9b3b-18e8280fcfcd_3456x.jpg?v=1718174549',
      originalPrice: 1999,
      price: 1399,
      discountPercentage: '30% OFF',
    },
  
    {
      name: 'Fur Jacket',
      image: 'https://i.pinimg.com/474x/3f/30/18/3f3018fba95a468a85b982e94776875f.jpg',
      originalPrice: 1999,
      price: 1799,
      discountPercentage: '15% OFF', 
    },
    {
      name: 'Bomber Jacket',
      image: 'https://images-cdn.ubuy.co.id/6539bbc2031a4b5f0103a393-enjoybuy-mens-bomber-jacket-casual-zip.jpg',
      originalPrice: 1499,
      price: 1349,
      discountPercentage: '10% OFF',
    }, 
  ];
  
  const ethnicWear = [
    {
      name: 'Traditional Sari',
      image: 'https://assets.ajio.com/medias/sys_master/root/20230822/cafJ/64e47eaeddf77915195f6b47/-473Wx593H-466289103-maroon-MODEL3.jpg',
      originalPrice: 1999,
      price: 1499,
      discountPercentage: '30% OFF',
    },
    {
      name: 'Kurta Pyjama',
      image: 'https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/the-forest-lucknowi-designer-kurta-pajama-6117.jpg',
      originalPrice: 999,
      price: 799,
      discountPercentage: '20% OFF',
    },
    {
      name: 'Kurti Set',
      image: 'https://assets2.andaazfashion.com/media/catalog/product/p/r/printed-light-peach-cotton-kurti-lkv001076-1_1.jpg',
      originalPrice: 799,
      price: 499,
      discountPercentage: '40% OFF', 
    },
    {
      name: 'Lehnga Choli',
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRB-Te84Dxmt8r6Aji8N5Q2DL1dp0XfApeXzRNYfAZKNcnWOLQn30EHNtA3X0TZnzx_f_-1BPho-eKIz5EO3fmjYJ29J046N2J2LfHCPDIUxhqV3A9t534s5gI',
      originalPrice: 1999,
      price: 899,
      discountPercentage: '55% OFF',
    },
    {
      name: 'Sequins Saree',
      image: 'https://monamaar.com/cdn/shop/products/0M1A2641.jpg?v=1678878874',
      originalPrice: 1799,
      price: 1349,
      discountPercentage: '25% OFF',
    },
  ]; 

  const categoriesData = {
    Top: [
      { image: 'https://4.imimg.com/data4/BJ/UE/MY-31206845/girls-top-dress-500x500.jpg', 
        name: 'Sleeveless Black Top', price: 500, discountPercentage: '20%', originalPrice: 625 },

      { image: 'https://m.media-amazon.com/images/I/71-a8EKWSLL._AC_UY350_.jpg', 
        name: 'Solid Long Dress Top', price: 400, discountPercentage: '20%', originalPrice: 500 },

      { image: 'https://i.pinimg.com/736x/4d/04/2c/4d042c7bc1abe229fc7fe0988cbb0ad9.jpg', 
        name: 'Traditional Top', price: 400, discountPercentage: '10%', originalPrice: 359 },

      { image: 'https://spendworth.in/cdn/shop/files/20231223_130323.webp?v=1703765726', 
        name: 'Crop Top Plazzo Dress', price: 999, discountPercentage: '40%', originalPrice: 599 },

      { image: 'https://www.libas.in/cdn/shop/files/34721.jpg?v=1713522937&width=1080', 
        name: ' Wedding Crop Top', price: 500, discountPercentage: '20%', originalPrice: 625 },
        
    ],

    Shirts: [ 
      { image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT8GO32NsgXFeVMI0TuiJliUrymGKDoudzRxJq9vIWNS2yD2WvwYr0qHVZ7Wx9nHKV91ZZ3iZLXNBx2ZifpxYjd_8M2qQWvFLs1YN8vWSno16e8YNQBxy-zSw', 
        name: 'Oversized Crochet Resort shirt', price: 300, discountPercentage: '25%', originalPrice: 400 },

      { image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRIYovAABXERjkKpW8gQ2EL905Gg8Nhl0nUkcWlPpTeYUl-k5gLoRU7CyGHBAB0KdyJUYBeiXExJTq83ZBcrV8se2Qq1hJCdsdegEHGzQXJ4neqegA0md7E', 
        name: 'Printed shirt', price: 300, discountPercentage: '50%', originalPrice: 600 },

      { image: 'https://assets.ajio.com/medias/sys_master/root/20240716/0tWC/6696adfc1d763220fac88f77/-473Wx593H-466961091-olive-MODEL.jpg', 
        name: 'Solid OverSized Fit Shirt', price: 500, discountPercentage: '20%', originalPrice: 625 },

      { image: 'https://www.tistabene.com/cdn/shop/files/MSH-1770A_1b0b1122-ea3d-468e-be35-8532cfd2ca41.jpg?v=1703316631', 
        name: 'Full Sleeves Cotton Printed Shirt', price: 599, discountPercentage: '17%', originalPrice: 498 },

      { image: 'https://5.imimg.com/data5/SELLER/Default/2023/12/368334062/DP/HR/EJ/32968154/t-shirtzmq6b-512-500x500.webp', 
        name: 'Plain Men Formal Shirt', price: 399, discountPercentage: '33%', originalPrice: 599 },
        
      { image: 'https://www.tistabene.com/cdn/shop/files/MSH-1915A.jpg?v=1703326353', 
        name: 'Half Sleeves Geometric Printed Shirt', price: 500, discountPercentage: '20%', originalPrice: 625 },
    ], 
    Midi: [
      { image: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/20814558/2023/8/21/d0e45028-40c7-4eb0-a107-a64534e1178f1692621462183-bebe-Solid-Sleeveless-Bodycon-Midi-Dress-6271692621461788-1.jpg', 
        name: 'Solid Sleeveless Bodycon Midi', price: 899, discountPercentage: '10%', originalPrice: 999 },

      { image: 'https://www.bullionknot.com/cdn/shop/files/Dahliamin_6.jpg?v=1715409243', 
        name: 'Dahlia Summer Midi', price: 500, discountPercentage: '20%', originalPrice: 625 },

      { image: 'https://sassafras.in/cdn/shop/products/SFDRSS11963-1_6722698d-5d62-4f5e-bb61-e831b1f32935_1800x.jpg?v=1707992543', 
        name: 'Navy Blue Front Cutout Rib Midi', price: 2500, discountPercentage: '16%', originalPrice: 2999 },

      { image: 'https://outcasts.in/cdn/shop/products/CL126642-black-knot-detail-ruched-midi-dress1_1200x_a14c3d0b-b4be-41bc-b12f-884cf711702d.webp?v=1673941945&width=1080', 
        name: 'Black Knot Detailed Rutched Midi', price: 1500, discountPercentage: '25%', originalPrice: 2000 },

      { image: 'https://images.meesho.com/images/products/412330777/woekx_512.webp', 
        name: 'Roll Up Sleeves Creep Midi', price: 749, discountPercentage: '25%', originalPrice: 999 },
        
      { image: 'https://d1it09c4puycyh.cloudfront.net/920x1300/catalog/product/m/d/mdd001-green_1589mdd001-green_1.jpg', 
        name: 'Cut Out Waist Green Slit Midi', price: 1999, discountPercentage: '20%', originalPrice: 2500 },

      { image: 'https://d1it09c4puycyh.cloudfront.net/920x1300/catalog/product/8/4/848116112A023-PINK_1.jpg', 
        name: 'Pink V-Neck Rib Knit Midi', price: 1699, discountPercentage: '15%', originalPrice: 1999 },

      { image: 'https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77022921_56.jpg?imwidth=2048&imdensity=1&ts=1713785888841', 
        name: 'Midi With Straps', price: 1999, discountPercentage: '20%', originalPrice: 2500 },
    ],
    Kurta: [
      { image: 'https://cdn.sareesaga.com/image/cache/data18/black-embroidered-festival-kurta-pyjama-213142-1000x1375.jpg', 
        name: 'Black Embroided Kurta Pajama', price: 999, discountPercentage: '30%', originalPrice: 699 },

      { image: 'https://cityvibes.in/cdn/shop/files/SPPX4248.jpg?v=1692864759&width=2048', 
        name: 'Grey Color Printed Kurta', price: 799, discountPercentage: '25%', originalPrice: 599 },

      { image: 'https://resources.indianclothstore.com/resources/productimages/1226-501122021-Brown-Cotton-Kurta-Pajama.jpg', 
        name: 'Brown Cotton Kurta', price: 500, discountPercentage: '20%', originalPrice: 625 },

      { image: 'https://5.imimg.com/data5/SELLER/Default/2022/11/PZ/MJ/ED/41101389/festival-new-collection-heavy-rubby-magic-cotton-full-set-of-kurta-pyjama-with-lowest-prince-indian-gujarat-surat-ethnic-garment-1-.jpeg', 
        name: 'Beautiful Green Color Men Kurta', price: 1799, discountPercentage: '15%', originalPrice: 1999 },

      { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq4bttDAnO3RJtdvVJot7KH_sspEBojEPDBA&s', 
        name: 'Punjabi Amritsari Kurta', price: 799, discountPercentage: '20%', originalPrice: 999 },
        
      { image: 'https://www.sudarshansaree.com/cdn/shop/products/ETW1539-1674.jpg?v=1679647570', 
        name: 'Latest Indo Western Traditional Wedding Kurta', price: 900, discountPercentage: '22%', originalPrice: 1099 },

      { image: 'https://i.etsystatic.com/17634941/r/il/193ded/3821527929/il_570xN.3821527929_7jvb.jpg', 
        name: 'Silk Designer Kurta Pajama', price: 1499, discountPercentage: '25%', originalPrice: 1999 },
    ],
  }; 

  const [showAd1, setShowAd1] = useState(true);
  const [showAd2, setShowAd2] = useState(true);
  const [showAd3, setShowAd3] = useState(true);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  }; 
  const hideMenu = () => { 
    setIsMenuVisible(false); 
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    Animated.timing(categoryPosition, { 
      toValue: 0,
      duration: 500, 
      useNativeDriver: false,
    }).start(); 
  }; 

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardPrice}>₹{item.price}</Text>
      <Text style={styles.cardDiscount}>{item.discountPercentage}</Text>
      <Text style={styles.cardOriginalPrice}>₹{item.originalPrice}</Text>
    </View>
  ); 

  const renderHomePage = () => {
    setSelectedCategory(null);
    Animated.timing(categoryPosition, {
      toValue: Dimensions.get('window').height / 2 - 50,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleAdClose1 = () => setShowAd1(false);
  const handleAdClose2 = () => setShowAd2(false);
  const handleAdClose3 = () => setShowAd3(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
            <Icon name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Rajkumari Fashions</Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </View>

        
        {isMenuVisible && ( 
         <TouchableWithoutFeedback onPress={hideMenu}>
          <View style={styles.menuDrawer}>
            <TouchableOpacity onPress={() => Alert.alert('Menu Option', 'Home clicked')}>
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Menu Option', 'Categories clicked')}>
              <Text style={styles.menuItem}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Menu Option', 'Order History Clicked clicked')}>
              <Text style={styles.menuItem}>Your Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Menu Option', 'Profile clicked')}>
              <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Menu Option', 'Settings clicked')}>
              <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Menu Option', 'Cart clicked')}>
              <Text style={styles.menuItem}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Menu Option', 'Account clicked')}>
              <Text style={styles.menuItem}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Sign Out', 'Sign out your account')}>
              <Text style={styles.menuItem}>Sign Out</Text>
            </TouchableOpacity>
          </View>
         </TouchableWithoutFeedback>)}

        {!selectedCategory && ( 
          <>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://ojmi-hosting-media-cdn.rajkumaribd.com/media-library/20241006180537/rajkumari-tanzina-banner-1200x675-1-960x540.jpg',
                }}
                style={styles.image}
              />
              <Text style={styles.discountText}>20% OFF</Text>
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Shop by Category</Text>
              <View style={styles.categoryButtons}>
                {Object.keys(categoriesData).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={styles.categoryButton} 
                    onPress={() => handleCategoryPress(category)}
                  >
                    <Text style={styles.categoryButtonText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
        {showAd1 && (
          <AdCard
            image="https://i.ytimg.com/vi/pQJ6fH6UWgM/maxresdefault.jpg"
            title="Premium 30% off"
            offerText="Listen to your favorite music."
            onClose={handleAdClose1}
          />
        )}
              

            <Text style={styles.trendingText}>Trending Fashions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
              {products.map((product, index) => renderCard({ item: product, index }))}
            </ScrollView>
          
        {showAd2 && (
          <AdCard
            image="https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/indianstartupnews/media/media_files/kH5IhV9VFGUjtqWvuNmO.jpg"
            title="Step toward success"
            offerText="India's best education institute."
            onClose={handleAdClose2}
          />
        )}
          

            <Text style={styles.trendingText}>Western Wear</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
              {westernWear.map((product, index) => renderCard({ item: product, index }))}
            </ScrollView>
            

          {showAd3 && (
            <AdCard
              image="https://i.ytimg.com/vi/usYj8bDXPzA/sddefault.jpg?v=611c9820"
              title="Now in Cinemas"
              offerText="50% off till 25 Dec 2024."
              onClose={handleAdClose3} 
            />
          )}
            
            <Text style={styles.trendingText}>Ethnic Wear</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
              {ethnicWear.map((product, index) => renderCard({ item: product, index }))}
            </ScrollView>

          </>
        )}

        {/* {selectedCategory && (
          <FlatList
            data={categoriesData[selectedCategory]}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} 
            columnWrapperStyle={styles.row} 
            contentContainerStyle={styles.cardContent} 
            horizontal={true} 
          />
        )}
  </ScrollView> */}

      {selectedCategory && (
        <FlatList
          data={categoriesData[selectedCategory]}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
          // numColumns={2} // Ensures 2 cards per row
          // columnWrapperStyle={styles.row} // Applies row styling
          contentContainerStyle={styles.cardContent} // Applies card content padding
          // horizontal={true} // Enables horizontal scrolling for FlatList
          // showsHorizontalScrollIndicator={false} // Optional: hides the scroll indicator
        />
      )}
      
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={renderHomePage}>
          <Icon name="home" size={24} color="white" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Icon name="list" size={24} color="white" />
          <Text style={styles.footerText}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Icon name="heart" size={24} color="white" />
          <Text style={styles.footerText}>Heart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Icon name="search" size={24} color="white" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Icon name="person" size={24} color="white" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContent: {
    paddingBottom: 60, 
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'purple',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 5,
  },
  notificationIcon: {
    padding: 5,
  },
  imageContainer: {
    width: width,
    height: 180,
    position: 'relative',
  },
  image: {
    width: width,
    height: 180,
    resizeMode: 'cover',
  },
  discountText: {
    position: 'absolute',
    top: '30%',
    right: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    zIndex: 1,
  },
  categoryContainer: {
    padding: 20,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  categoryButton: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 45,
    marginHorizontal: 5,
  },
  categoryButtonText: { 
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trendingText: {
    fontSize: 19,
    fontWeight: 'bold',
    padding: 10,
  },
  productScroll: {
    marginBottom: 20,
  },
  card: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    width: width * 0.63, 
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 5,
    marginVertical: 10, 
  },
  cardImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 16,
    color: 'red',
    marginVertical: 5,
    textAlign: 'center',
  },
  cardDiscount: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
  },
  cardOriginalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'gray',
    textAlign: 'center',
  },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-start', 
  //   marginBottom: 20, 
  // },

  cardContent: {
    paddingHorizontal: 56, 
    paddingBottom: 20, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'purple',
    height: 60,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 12,
  },
  menuDrawer: {
    position: 'absolute',
    top: 60, 
    left: 0,
    width: '70%', 
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 10,
  },
  menuItem: { 
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  adCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  adImage: {
    width: 150,
    height: 80,
    borderRadius: 10,
  },
  adTextContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f05454',
  },
  offerText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 1,
    right: 8,
  },
});

export default App;
