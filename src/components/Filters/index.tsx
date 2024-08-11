import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { getCategories } from '../../utils/api'
import { Category } from '../../types/finance'

interface FiltersProps {
    isOpen?: boolean
    applyFilters: (categories: string[]) => void
}

export const Filters = ({ isOpen = false, applyFilters }: FiltersProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategories, setSelectedCaregories] = useState<string[]>([])

    const getCategoryClass = (categoryName: string) => {
        return checkIfIsSelected(categoryName) ? styles.selected : ""
    }

    const checkIfIsSelected = (categoryName: string) => {
        return selectedCategories.includes(categoryName)
    }

    const handleCategoryClick = (category: string) => {
        setSelectedCaregories(prev => {
            const alreadyIncluded = prev.includes(category)
            return alreadyIncluded ? prev.filter(c => category !== c) : [...prev, category]
        })
    }

    const cleanFilters = () => {
        setSelectedCaregories([])
        applyFilters([])
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesReturn = await getCategories()
            setCategories(categoriesReturn)
        }

        fetchCategories()
    }, [])

    return (
        <div className={`${styles.filters} ${isOpen ? styles.active : ""}`}>
            <div className={styles.categories}>
                <span className={styles.title}>Categoria</span>
                <div className={styles.list}>
                    {categories.map(category => (
                        <div
                            key={category.id}
                            onClick={() => handleCategoryClick(category.descricao)}
                            className={getCategoryClass(category.descricao)}
                        >
                            {category.descricao}
                            <span>{checkIfIsSelected(category.descricao) ? "x" : "+"}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.actions}>
                <button
                    className={styles.cleanBtn}
                    onClick={cleanFilters}
                >Limpar filtros</button>
                <button
                    className={styles.applyBtn}
                    onClick={() => applyFilters(selectedCategories)}
                >Aplicar filtros</button>
            </div>
        </div>
    )
}