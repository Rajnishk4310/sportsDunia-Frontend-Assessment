# SportsDunia

## Task Overview 🚀

The assessment involves creating a dynamic table layout to display college data, incorporating features like infinite scroll, sorting, and search functionality.

### ✔️ Features Implemented

1. **Table Layout 📊**: 
   - A table layout is created to display college data including:
     - College name
     - JEE Advanced cutoffs
     - Course fees
     - Placement information
     - User reviews
     - Various rankings
     - CD rankings
   - A "Featured" flag is displayed if any college has a truthy `featured` value.

2. **Infinite Scroll 🔄**:
   - Initially, 10 rows are displayed in the table.
   - As the user scrolls, additional rows are dynamically loaded into the same table, implementing infinite scroll functionality.

3. **Dummy JSON Data 📑**:
   - A dummy JSON dataset of different colleges is created and displayed in the above-mentioned layout.

4. **Sorting Functionality ⬆️⬇️**:
   - Users can sort the table data by clicking on column headers based on the following criteria:
     - **Collegedunia Rating (cdRank)** (default): Sortable in ascending and descending order.
     - **Fees (courseFees)**: Sortable in ascending and descending order.
     - **User Review Rating (userReviews.rating)**: Sortable in ascending and descending order.
     - **Placement Average Package (placement.avgPackage)**: Sortable in ascending and descending order.

5. **Search by College Name 🔍**:
   - A search bar is provided to filter the table data based on the college name.
