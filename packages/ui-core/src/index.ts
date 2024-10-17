// ICONS
export {
    IconAI,
    IconActionMenu,
    IconAdd,
    IconAdmin,
    IconArrowRight,
    IconBriefCase,
    IconCalendar,
    IconCamera,
    IconCheckFalse,
    IconCheckTrue,
    IconClose,
    IconDLE,
    IconEdit,
    IconEye,
    IconGroups,
    IconImagePlaceholder,
    IconKebabMenu,
    IconLoading,
    IconMapPin,
    IconMember,
    IconMenu,
    IconPackage,
    IconPlaceholder,
    IconPrint,
    IconQRCode,
    IconSave,
    IconSearch,
    IconUpload,
    IconUsers,
    IconView
} from './components/icons';

// MODEL
export {
    type Actions, type CloudflareImageDeleteResponse, type CloudflareImagePostResponse, type CloudflareImagePostResponseResult, type Collection,
    type CollectionAPIPOST,
    type CollectionWithRelations,
    type Image,
    type ImageWithRelations,
    type Item,
    type ItemWithRelations, type Tag,
    type TagWithRelations, type User, type UserApiPost, type UserWithRelations
} from './model';

// COMPONENTS
export { default as NavigationButton } from './cloudkit/atoms/buttons/navigation-button.svelte';
export { default as Button } from './cloudkit/atoms/buttons/simple-button.svelte';
export { default as CardContainer } from './components/card/card-container.svelte';
export { default as Card } from './components/card/card.svelte';
export { default as ImageInput } from './components/forms/image-input.svelte';
export { default as TextEdit } from './components/forms/text-edit.svelte';
export { default as TextInputArea } from './components/forms/text-input-area.svelte';
export { default as TextInputAutoComplete } from './components/forms/text-input-autocomplete.svelte';
export { default as TextInput } from './components/forms/text-input.svelte';
export { default as ListItem } from './components/lists/list-tem.svelte';
export { default as TreeItem } from './components/lists/tree-item.svelte';
export { default as Avatar } from './components/media/avatar.svelte';
export { default as ImageResource } from './components/media/image-resource.svelte';
export { default as QRCode } from './components/media/qr-code.svelte';
export { default as Link } from './components/nav/link.svelte';
export { default as NavBarLink } from './components/nav/navbar-link.svelte';
export { default as SkeletonCardList } from './components/skeletons/skeleton-card-list.svelte';
export { default as Typography } from './components/typography/typography.svelte';

// UTILS
export { convertFileToBase64 } from './utils';

// CONSTANTS
export { MEMBER_STATUS, UPLOAD_FILTERS, UPLOAD_OPTIONS, isDevOrCi } from './constants';

// SCHEMAS
export {
    ACCEPTED_IMAGE_TYPES,
    ALLOWED_STRINGS,
    AuthenticateSchema, CollectionSchema, CreateCollectionchema,
    DeleteCollectionSchema,
    EditCollectionSchema,
    EditItemSchema,
    EditUserSchema,
    ImageSchema,
    ItemsWithCollectionSchema,
    MAX_FILE_SIZE,
    RegistrationSchema
} from './schemas';

// ROUTING
export { FORM_ACTIONS, PATHS, PATH_GROUPS, SERVER_FORM_ACTIONS } from './routing';

// MODALS
export {
    MODAL_PROTECTED,
    MODAL_PUBLIC, authenticateModalConfig, createCollectionModalConfig,
    createEditItemModalConfig,
    createMoveItemModalConfig,
    editCollectionModalConfig,
    getConfirmationModalConfig,
    getEditCollectionModalConfig,
    getErrorModal,
    getOnboardingModalConfig, moveCollectionModalConfig,
    openConfirmationModal,
    registerModalConfig,
    uploadImagesModalConfig
} from './components/modals';

// CACHE
export { cache, cacheFetch, clearCache } from './cache';

export type { HTMLInputTypeAttribute } from './components/forms/input-types';


// CLOUDKIT
// export {default as } from "./rootConainer.svelte";
// export {default as } from "./organisms/navbar.svelte";
// export {default as } from "./organisms/modals/errorModal.svelte";
// export {default as } from "./organisms/modals/signInModal.svelte";
// export {default as } from "./organisms/modals/signUpModal.svelte";
// export {default as } from "./molecues/user/otherUserDetails.svelte";
// export {default as } from "./molecues/user/userCardList.svelte";
// export {default as } from "./molecues/user/myUserDetails.svelte";
// export {default as } from "./molecues/textEdit.svelte";
// export {default as } from "./icons/IconDle.svelte";
// export {default as } from "./atoms/buttons/simpleButton.svelte";
// export {default as } from "./atoms/typography/typography.svelte";
// export {default as } from "./atoms/forms/textAutocomplete.svelte";
// export {default as } from "./atoms/forms/text.svelte";
// export {default as } from "./atoms/forms/textArea.svelte";
// export {default as } from "./atoms/media/image.svelte";
// export {default as } from "./atoms/media/avatar.svelte";
// export {default as } from "./atoms/icons/IconEdit.svelte";
// export {default as } from "./atoms/icons/IconLoading.svelte";
// export {default as } from "./atoms/icons/IconPlaceholder.svelte";
// export {default as } from "./atoms/icons/IconCalendar.svelte";
// export {default as } from "./atoms/icons/IconMenu.svelte";
// export {default as } from "./atoms/icons/IconCheckFalse.svelte";
// export {default as } from "./atoms/icons/IconImagePlaceholder.svelte";
// export {default as } from "./atoms/icons/IconUpload.svelte";
// export {default as } from "./atoms/icons/IconUsers.svelte";
// export {default as } from "./atoms/icons/IconAdmin.svelte";
// export {default as } from "./atoms/icons/IconMember.svelte";
// export {default as } from "./atoms/icons/IconCheckTrue.svelte";
// export {default as } from "./atoms/icons/IconSave.svelte";
// export {default as } from "./atoms/icons/IconMapPin.svelte";
// export {default as } from "./atoms/skeletons/skeletonCardList.svelte";
// export {default as } from "./atoms/nav/navbarLink.svelte";
// export {default as } from "./atoms/nav/link.svelte";
// export {default as } from "./atoms/lists/listItem.svelte";
// export {default as } from "./sections/runProd.svelte";
// export {default as } from "./sections/scripts.svelte";
// export {default as } from "./sections/aboutThisProject.svelte";
// export {default as } from "./sections/prismaCodeOrg.svelte";
// export {default as } from "./sections/prerequisites.svelte";
// export {default as } from "./sections/dataProxy.svelte";
// export {default as } from "./sections/tech.svelte";
// export {default as } from "./sections/welcome.svelte";
// export {default as } from "./sections/githubActions.svelte";
// export {default as } from "./sections/authFlow.svelte";
// export {default as } from "./sections/pr.svelte";
// export {default as } from "./sections/runLocal.svelte";
