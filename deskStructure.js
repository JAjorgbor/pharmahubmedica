import S from '@sanity/desk-tool/structure-builder';

export default () => {
    return S.list()
      .title('Content')
      .items([
        ...S.documentTypeListItems().filter(
          (listItem) => !['review'].includes(listItem.getId())
        ),
        // ... other list items ...
      ]);
  };