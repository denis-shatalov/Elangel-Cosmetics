import styles from "./ProductCardSkeleton.module.css";

export default function ProductCardSkeleton() {
  return (
    <div className={`${styles.catalogCard} ${styles.skeleton}`}>
      <div className={styles.skeletonImage} />
      <div className={`${styles.skeletonText} ${styles.title}`} />
      <div className={`${styles.skeletonText} ${styles.price}`} />
    </div>
  );
}
