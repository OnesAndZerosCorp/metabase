import React, { useState } from "react";
import PropTypes from "prop-types";
import { t } from "ttag";

import * as Urls from "metabase/lib/urls";

import AdminPaneLayout from "metabase/components/AdminPaneLayout";
import Radio from "metabase/components/Radio";
import { useDebouncedValue } from "metabase/hooks/use-debounced-value";
import { SEARCH_DEBOUNCE } from "metabase/lib/constants";

import SearchInput from "../components/SearchInput";
import PeopleList from "../components/PeopleList";
import { UserStatus } from "../enums";

export default function PeopleListingApp({ children }) {
  const [status, setStatus] = useState(UserStatus.active);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery, SEARCH_DEBOUNCE);

  const handleFilterChange = value => setStatus(value);
  const handleQueryChange = value => setSearchQuery(value);

  const headingContent = (
    <div className="mb2 flex">
      <SearchInput
        className="text-small mr2"
        type="text"
        placeholder={t`Find someone`}
        value={searchQuery}
        onChange={handleQueryChange}
        clearButton
      />
      <Radio
        className="ml2 text-bold"
        value={status}
        options={[
          { name: t`Active`, value: UserStatus.active },
          { name: t`Deactivated`, value: UserStatus.deactivated },
        ]}
        showButtons
        py={1}
        onChange={handleFilterChange}
      />
    </div>
  );

  return (
    <AdminPaneLayout
      headingContent={headingContent}
      buttonText={status === UserStatus.deactivated ? null : t`Invite someone`}
      buttonLink={Urls.newUser()}
    >
      <PeopleList searchQuery={debouncedSearchQuery} status={status} />
      {children}
    </AdminPaneLayout>
  );
}

PeopleListingApp.propTypes = {
  children: PropTypes.node,
};
