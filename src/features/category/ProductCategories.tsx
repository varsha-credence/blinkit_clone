import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomeHeader from '@components/ui/CustomeHeader'
import { Colors } from '@utils/Constants'
import Sidebar from './Sidebar'
import { getAllCategories, getProductsByCategoryId } from '@service/ProductService'
import ProductList from './ProductList'
import WithCart from '@features/cart/WithCart'

const ProductCategories = () => {
    const [categories, setCategories] = useState<any[]>([])
    const [selectedCategories, setSelectedCategories] = useState<any>(null)
    const [products, setProducts] = useState<any[]>([])
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true)
    const [productsLoading, setProductsLoading] = useState<boolean>(false)

    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true)
            const data = await getAllCategories()
            setCategories(data)
            if (data && data.length > 0) {
                setSelectedCategories(data[0])
            }
        } catch (error) {
            console.log("Error fetching categories", error)
        } finally {
            setCategoriesLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])


    const fetchProducts = async (categoryId: string) => {
        try {
            setProductsLoading(true)
            const data = await getProductsByCategoryId(categoryId)
            setProducts(data)

        } catch (error) {
            console.log("Error fetching products", error)
        } finally {
            setProductsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedCategories?._id) {
            fetchProducts(selectedCategories?._id)
        }
    }, [selectedCategories])

    return (
        <View style={styles.mainContainer}>
            <CustomeHeader title={selectedCategories?.name || 'Categories'} search />
            <View style={styles.subContainer}>
                {categoriesLoading ? (<ActivityIndicator size='small' color={Colors.border} />) : (
                    <Sidebar
                        categories={categories}
                        selectedCategory={selectedCategories}
                        onCategoryPress={(category: any) => setSelectedCategories(category)}
                    />
                )}

                {productsLoading ? (
                    <ActivityIndicator size='large' color={Colors.border} style={styles.center} />
                ) : (
                    <ProductList data={products || []} />
                )}
            </View>
        </View>
    )
}

export default WithCart(ProductCategories)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})