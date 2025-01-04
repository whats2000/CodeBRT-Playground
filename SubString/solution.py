class Solution:
    def waysToSplitArray(self, nums):
        n = len(nums)
        total_sum = sum(nums)
        left_sum = 0
        count = 0
        for i in range(n - 1):
            left_sum += nums[i]
            right_sum = total_sum - left_sum
            if left_sum >= right_sum:
                count += 1
        return count

if __name__ == '__main__':
    solution = Solution()
    # Test cases
    print(solution.waysToSplitArray([10,4,-8,7]))
    print(solution.waysToSplitArray([2,3,1,0]))
    print(solution.waysToSplitArray([0,0]))
    print(solution.waysToSplitArray([1,2,3,4,5,6]))
    print(solution.waysToSplitArray([6,5,4,3,2,1]))
