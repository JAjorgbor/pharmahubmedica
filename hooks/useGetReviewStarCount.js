export default function () {
  const starsCount = (reviews) => {
    const fiveStarCount = reviews?.filter((review) => review.stars == 5)?.length
    const fourStarCount = reviews?.filter((review) => review.stars == 4)?.length
    const threeStarCount = reviews?.filter(
      (review) => review.stars == 3
    )?.length
    const twoStarCount = reviews?.filter((review) => review.stars == 2)?.length
    const oneStarCount = reviews?.filter((review) => review.stars == 1)?.length
    switch (
      Math.max(
        fiveStarCount,
        fourStarCount,
        threeStarCount,
        twoStarCount,
        oneStarCount
      )
    ) {
      case fiveStarCount:
        return 5
      case fourStarCount:
        return 4
      case threeStarCount:
        return 3
      case twoStarCount:
        return 2
      case oneStarCount:
        return 1
      default:
        return 0
    }
  }
  return starsCount
}
