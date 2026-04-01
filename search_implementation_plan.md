# Book Button — Search Modal for Missing Data

## Problem

In the `HotelSummaryInfo` component ([hotel-summary-info.tsx](file:///c:/Users/USER/Desktop/codeverse/voyago/components/hotel/hotel-summary-info.tsx)), the "Book" button currently renders as a `<Link>` that navigates to:

```
/hotels/${info._id}/payment?checkin=${checkin}&checkout=${checkout}
```

If the user lands on the hotel details page without a valid hotel ID or without check-in/check-out dates, clicking "Book" would navigate to a broken/incomplete payment URL (e.g., `/hotels/undefined/payment?checkin=&checkout=`).

## Goal

Ensure the user **cannot** proceed to the payment page without:
1. A valid hotel (hotel ID)
2. Check-in and check-out dates

When any of these are missing, show a **modal popup** containing the reusable `Search` component (from `components/search/search.tsx`) so the user can select the missing data. After selection, redirect to the correct payment URL.

---

## Proposed Changes

### Component: HotelSummaryInfo

#### [MODIFY] [hotel-summary-info.tsx](file:///c:/Users/USER/Desktop/codeverse/voyago/components/hotel/hotel-summary-info.tsx)

This is the primary file that needs changes. The "Book" button logic (lines 126–138) must be updated.

**Step 1 — Add state for modal visibility**

Add a `useState` hook to control whether the search modal is open:

```tsx
const [showSearchModal, setShowSearchModal] = useState(false);
```

**Step 2 — Add a missing-data check function**

Create a helper that determines whether the required data is present:

```tsx
const isMissingBookingData = !info?._id || !checkin || !checkout;
```

**Step 3 — Replace the Book button's `<Link>` wrapper with conditional logic**

Currently the Book button is wrapped in a `<Link>`. Replace this with:

- **If data is complete** → Navigate to the payment page (same as current behavior).
- **If data is missing** → Open the search modal instead of navigating.

```tsx
{fromListPage ? (
  // ... existing Details link (unchanged)
) : (
  <>
    {isMissingBookingData ? (
      <button
        disabled={info?.isBooked}
        onClick={() => setShowSearchModal(true)}
        className="btn-primary text-neutral-900!"
      >
        Book
      </button>
    ) : (
      <Link
        href={
          info?.isBooked
            ? "#"
            : `/hotels/${info._id}/payment?checkin=${checkin}&checkout=${checkout}`
        }
      >
        <button disabled={info?.isBooked} className="btn-primary text-neutral-900!">
          Book
        </button>
      </Link>
    )}
  </>
)}
```

**Step 4 — Render the Search Modal**

Add a `Dialog` (from `components/ui/dialog.tsx` — already exists in the project) at the bottom of the component's JSX. Inside the dialog, render the reusable `Search` component.

```tsx
<Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>Complete Your Booking</DialogTitle>
      <DialogDescription>
        Please select your destination and travel dates to proceed.
      </DialogDescription>
    </DialogHeader>
    <Search />
  </DialogContent>
</Dialog>
```

> [!IMPORTANT]
> The existing `Search` component's `handleSearch` function (line 65 in `search.tsx`) currently navigates to `/hotels?...` or updates the URL on the hotels list page. We need to **modify** the Search component to support a callback-based flow so that from the modal it redirects to the payment page instead.

**New imports needed:**

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Search from "@/components/search/search";
```

---

### Component: Search

#### [MODIFY] [search.tsx](file:///c:/Users/USER/Desktop/codeverse/voyago/components/search/search.tsx)

The Search component needs a small extension to support a custom callback when used inside the modal.

**Step 1 — Add an optional `onSearch` callback prop**

Extend the `Props` type:

```tsx
type Props = {
  fromList?: boolean;
  destination?: string;
  checkin?: string;
  checkout?: string;
  onSearch?: (searchTerm: SearchTerm) => void;  // NEW
};
```

**Step 2 — Use the callback in `handleSearch`**

At the top of `handleSearch`, after the login check, add:

```tsx
if (onSearch) {
  onSearch(searchTerm);
  return;
}
```

This ensures that when `onSearch` is provided (i.e., from the modal), the Search component delegates navigation to the parent instead of performing its own routing.

**Step 3 — Update the button label (optional)**

When used inside the modal, the button text could say "Proceed to Payment" instead of "Search". This can be controlled via the existing `fromList` prop or a new `buttonLabel` prop:

```tsx
type Props = {
  // ... existing
  buttonLabel?: string;  // NEW (optional)
};
```

```tsx
<button onClick={handleSearch} disabled={!allowSearch} className="search-btn">
  🔍️ {buttonLabel || (fromList ? "Modify Search" : "Search")}
</button>
```

---

### Back in HotelSummaryInfo — Wiring the callback

#### [MODIFY] [hotel-summary-info.tsx](file:///c:/Users/USER/Desktop/codeverse/voyago/components/hotel/hotel-summary-info.tsx)

Add a handler that receives the search data from the modal and navigates to the payment page:

```tsx
const router = useRouter(); // add import from next/navigation

const handleSearchComplete = (searchTerm: SearchTerm) => {
  setShowSearchModal(false);
  // Use info._id from the current hotel (since user is already on the details page)
  // If info._id is somehow missing, the search will have taken them to hotels list
  if (info?._id && searchTerm.checkin && searchTerm.checkout) {
    router.push(
      `/hotels/${info._id}/payment?checkin=${searchTerm.checkin}&checkout=${searchTerm.checkout}`
    );
  }
};
```

Then pass it to the `Search` component in the modal:

```tsx
<Search
  onSearch={handleSearchComplete}
  buttonLabel="Proceed to Payment"
/>
```

---

## Summary of All File Changes

| File | Change |
|---|---|
| [hotel-summary-info.tsx](file:///c:/Users/USER/Desktop/codeverse/voyago/components/hotel/hotel-summary-info.tsx) | Add modal state, missing-data check, conditional Book button, Dialog with Search component, `handleSearchComplete` callback, `useRouter` import |
| [search.tsx](file:///c:/Users/USER/Desktop/codeverse/voyago/components/search/search.tsx) | Add optional `onSearch` callback prop and optional `buttonLabel` prop to `Props` type; call `onSearch` early-return in `handleSearch` |

> [!NOTE]
> No changes needed in `summary.tsx` or `page.tsx` — the `checkin` and `checkout` values are already passed down from the page through Summary to HotelSummaryInfo. The modal handles the case where they arrive as empty strings.

---

## Open Questions

> [!IMPORTANT]
> **Destination field in modal**: The Search component includes a "Destination" dropdown. When the user is already on a specific hotel's details page, do you want to:
> - **(A)** Hide the destination field in the modal since the hotel is already selected? (Simpler — just collect dates)
> - **(B)** Show the full Search component as-is including destination? (This matches the requirement of reusing the exact same component, but the destination choice is irrelevant since the user is already on a specific hotel page)
>
> **Recommendation**: Option **(A)** — hide the destination selector and only show check-in/check-out date pickers. This avoids confusing the user. However, this requires an additional prop on the Search component (e.g., `hideDestination`).

> [!NOTE]
> **Edge case — missing hotel ID**: If `info._id` is missing (user somehow landed on the page without a valid hotel), the Search component's destination dropdown won't help select a specific hotel. In this case, the `handleSearchComplete` callback could fall back to navigating to the hotels listing page instead. Is this acceptable?

---

## Verification Plan

### Manual Verification

1. **Navigate to hotel details page WITH valid dates** → Click "Book" → Should navigate to payment page as usual (no modal).
2. **Navigate to hotel details page WITHOUT dates** (e.g., `/hotels/123`) → Click "Book" → Modal should appear with Search component → Select dates → Should redirect to `/hotels/123/payment?checkin=...&checkout=...`.
3. **Verify modal closes** on successful search submission.
4. **Verify the "Book" button is disabled** when the hotel is already booked (`info.isBooked`), regardless of whether dates are present.
5. **Verify the existing Search component behavior** on the homepage and hotels listing page is **unchanged** (no regressions from the `onSearch` prop addition).
