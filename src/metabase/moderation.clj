(ns metabase.moderation
  (:require [metabase.models.moderation-request :refer [ModerationRequest]]
            [metabase.models.moderation-review :refer [ModerationReview]]
            [toucan.db :as db]))

(defn moderation-requests-for-item
  "ModerationRequests for the `moderated-item` whose ID is provided. `item-type` should be a keyword (`:card` or `:dashboard`)"
  [item-type moderated-item-id]
  (db/select ModerationRequest :moderated_item_type (name item-type) :moderated_item_id moderated-item-id))

(defn moderation-reviews-for-item
  "ModerationReviews for the `moderated-item` whose ID is provided. `item-type` should be a keyword (`:card` or `:dashboard`)"
  [item-type moderated-item-id]
  (db/select ModerationReview  :moderated_item_type (name item-type) :moderated_item_id moderated-item-id))
